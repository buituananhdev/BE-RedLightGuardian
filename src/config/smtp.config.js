import nodemailer from 'nodemailer';
import { smtpHost, smtpPort, smtpUser, smtpPass, smtpEmail } from "./index.js";

const transporter = nodemailer.createTransport({
    pool: true,
    host: smtpHost,
    port: smtpPort,
    auth: {
        user: smtpUser,
        pass: smtpPass,
    },
});

const mailService = {
    async sendMail({ emailTo, emailContent }) {
        try {
            await transporter.sendMail({
                from: smtpEmail,
                to: emailTo,
                subject: "Thông báo vi phạm giao thông",
                html: emailContent,
            });
            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    },
};

Object.freeze(mailService);
export default mailService;