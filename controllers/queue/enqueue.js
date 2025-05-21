import produce_email_enqueue_job from "../../core/producer.js";
import Keys from "../../models/keys.js";
import Activity from "../../models/activity.js";

const enqueue_controller = async (req, res) => {
  try {
    const { user } = req;
    const { key } = req.body;
    if (!user || !key) {
      return res
        .status(401)
        .send({
          error: `Unauthorized: ${user ? "Missing key" : "Missing user"}`,
        });
    }
    const keysDoc = await Keys.findOne({ user: user._id });
    if (!keysDoc) {
      return res.status(403).send({ error: "No keys assigned to user " + user.email });
    }
    const keyObj = keysDoc.keys.find((k) => k.key === key);
    if (!keyObj) {
      return res.status(403).send({ error: "Invalid key" });
    }
    const remaining_emails = keysDoc.max_quota - keysDoc.used_quota;
    if (remaining_emails <= 0) {
      return res.status(429).send({ error: "Usage quota exhausted." });
    }
    const { email, subject, body, attachments } = req.body;
    if (!email) {
      return res.status(400).send({ error: "Please provide email." });
    }
    const id = await produce_email_enqueue_job(
      email,
      subject,
      body,
      attachments
    );
    keysDoc.used_quota += 1;
    await keysDoc.save();
    await Activity.create({
      type: "enqueue",
      info: `Enqueued email to ${email}`,
      user: user._id,
      status: "success",
    });
    return res
      .status(201)
      .send({ status: "success", id: id });
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Enqueue process failed: " + error.message });
  }
};

export default enqueue_controller;
