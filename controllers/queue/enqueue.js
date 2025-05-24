import produce_email_enqueue_job from "../../core/producer.js";
import Keys from "../../models/keys.js";
import Activity from "../../models/activity.js";
import User from "../../models/user.js";

const enqueue_controller = async (req, res) => {
  try {
    const { key } = req.body;
    const request_agent = req.headers['user-agent'] || '';
    const is_browser_call = /Mozilla|Chrome|Safari|Firefox|Edge/.test(request_agent); // restricts API access over Free tier
    if (!key) {
      return res.status(401).json({
        error: `Unauthorized: Missing key`,
      });
    }
    const keys_document = await Keys.findOne({ "keys.key": key });
    if (!keys_document) {
      return res.status(403).json({ error: "Key not found." });
    }
    const user = await User.findById(keys_document.user);
    if (!is_browser_call && user.subscription === "Free") {
      return res.status(405).json({
        error: "API access unavailable over your current plan."
      })
    }
    if (!user) {
      return res.status(403).json({ error: "User not found." });
    }
    if (keys_document.keys.length === 0) {
      return res
        .status(403)
        .json({ error: "No keys assigned to user " + user.email });
    }
    const key_object = keys_document.keys.find((k) => k.key === key);
    if (!key_object) {
      return res.status(403).json({ error: "Invalid key" });
    }
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
