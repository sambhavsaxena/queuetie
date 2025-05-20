import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { MAIL_SMTP_SERVICE, MAIL_SMTP_USER, MAIL_SMTP_PASSWORD } = process.env;

const send_email = async ({ to, subject, text }) => {
    const transporter = nodemailer.createTransport({
        service: MAIL_SMTP_SERVICE,
        auth: {
            user: MAIL_SMTP_USER,
            pass: MAIL_SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"Queuetie" <${MAIL_SMTP_USER}>`,
        to,
        subject,
        text,
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log('Email sent:', response.response);
        return { success: true, response };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
}

export default send_email;
