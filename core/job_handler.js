import nodemailer from "nodemailer";

export const email_job_handler = async (job) => {
    const {
        subject,
        body,
        attachments,
        to,
        from_user,
        from_service,
        from_password,
    } = job.data;

    const transporter = nodemailer.createTransport({
        service: from_service,
        auth: { user: from_user, pass: from_password },
    });

    const mail_options = {
        from: `"Queuetie" <${from_user}>`,
        to,
        subject,
        html: body,
        ...(attachments?.length && { attachments }),
    };

    const info = await transporter.sendMail(mail_options);
    console.log(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
};
