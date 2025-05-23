import { email_queue } from "./connections.js";
const { MAIL_SMTP_SERVICE, MAIL_SMTP_USER, MAIL_SMTP_PASSWORD } = process.env;

const produce_email_enqueue_job = async ({ email, subject, body, attachments }) => {
  try {
    const payload = {
      to: email,
      subject,
      body,
      from_user: MAIL_SMTP_USER,
      from_service: MAIL_SMTP_SERVICE,
      from_password: MAIL_SMTP_PASSWORD,
    };
    if (attachments && Array.isArray(attachments)) {
      payload.attachments = attachments;
    }
    const response = await email_queue.add("email", payload, {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    });
    return response.id;
  } catch (error) {
    console.error("Error queueing email: ", error);
    throw new Error("Failed to enqueue email job", error);
  }
};

export default produce_email_enqueue_job;
