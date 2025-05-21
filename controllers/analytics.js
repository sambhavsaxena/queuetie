import Keys from "../models/keys.js";

const get_analytics = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const key_document = await Keys.findOne({ user: user._id });
    if (!key_document) {
      return res.status(404).json({ message: "No keys found" });
    }
    const { used_quota, max_quota, keys } = key_document;
    const total_keys = keys.length;
    return res.status(200).json({
      used_quota,
      max_quota,
      total_keys,
    });
  } catch (error) {
    return res.status(500).json({ error: "Cannot fetch analytics: " + error });
  }
};

export { get_analytics };
