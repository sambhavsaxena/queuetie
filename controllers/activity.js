import Activity from "../models/activity.js";

const get_recent_activity = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const activities = await Activity.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(6);
    if (!activities) {
      return res.status(404).json({ error: "No activities found" });
    }
    const activity_list = activities.map((activity) => ({
      id: activity._id,
      type: activity.type,
      info: activity.info,
      status: activity.status,
      user: activity.user,
      createdAt: activity.createdAt,
    }));
    return res.status(200).json({ activities: activity_list });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching activities." });
  }
};

export { get_recent_activity };
