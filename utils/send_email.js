import { produce_email_enqueue_job } from "../core/producer.js";
import { create_token } from "./token.js";

const send_email_verification = async (user) => {
    const token = create_token(user._id, "1h");
    const verification_url = `${process.env.FRONTEND_URL}/verify?token=${token}`;
    const message = `Hi ${user.email},
      <br/>You are receiving this mail because you have requested a verification to your Queuetie account.<br/>
      Click <a href="${verification_url}">this</a> URL to login and verify your account.<br/>
      If you haven't requested this verification, you can safely ignore this email.
      <br/><br/>
      Thank You.
      <br/><br/>
      Queuetie`
    try {
        const response = await produce_email_enqueue_job({
            email: user.email,
            subject: "Verify your email",
            body: message,
        });
        if (!response) {
            return res.status(500).json({
                error: "Error sending verification email. Please try again later.",
            });
        }
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default send_email_verification;
