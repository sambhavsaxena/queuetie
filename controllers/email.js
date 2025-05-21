import Email from "../models/email.js";

const get_emails_count_by_user = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const emails = await Email.find({ user: user._id });
    if (!emails) {
      return res.status(404).json({ message: "No emails found" });
    }
    const emailsCount = emails.length;
    return res.status(200).json({ emailsCount });
  } catch (error) {
    console.error();
    return res
      .status(500)
      .json({ message: "Error fetching analytics: " + error });
  }
};

export { get_emails_count_by_user };
