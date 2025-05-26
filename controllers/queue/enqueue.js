import produce_email_enqueue_job from "../../core/producer.js";
import Activity from "../../models/activity.js";

const enqueue_controller = async (req, res) => {
  try {
    const { user, keys_document } = req;
    const remaining_emails = keys_document.max_quota - keys_document.used_quota;
    if (remaining_emails <= 0) {
      return res.status(429).json({ error: "Usage quota exhausted." });
    }
    const { email, subject, body, attachments } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Please provide email." });
    }
    const id = await produce_email_enqueue_job(
      {
        email,
        subject,
        body,
        attachments
      }
    );
    keys_document.used_quota += 1;
    await keys_document.save();
    await Activity.create({
      type: "enqueue",
      info: `Enqueued email to ${email}`,
      user: user._id,
      status: "success",
    });
    return res.status(201).json({ status: "success", id: id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Enqueue process failed: " + error.message });
  }
};

export default enqueue_controller;
