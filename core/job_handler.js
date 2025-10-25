import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

const { MAIL_SMTP_SERVICE, MAIL_SMTP_USER, MAIL_SMTP_PASSWORD } = process.env;

export const email_job_handler = async (job) => {
    const {
        subject,
        body,
        attachments,
        to,
    } = job.data;

    const transporter = nodemailer.createTransport({
        service: MAIL_SMTP_SERVICE,
        auth: { user: MAIL_SMTP_USER, pass: MAIL_SMTP_PASSWORD },
    });

    const mail_options = {
        from: `"Queuetie" <${MAIL_SMTP_USER}>`,
        to,
        subject,
        html: body,
        ...(attachments?.length && { attachments }),
    };

    const info = await transporter.sendMail(mail_options);
    console.log(`Email sent: ${info.messageId}`);
    if (attachments && Array.isArray(attachments)) {
        for (const file of attachments) {
            const filePath = path.resolve(file.path);
            await fs.unlink(filePath);
        }
    }
    return { success: true, messageId: info.messageId };
};
