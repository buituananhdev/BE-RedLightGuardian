import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { smtpHost, smtpPort, smtpUser, smtpPass, smtpEmail } from "./index.js";

// Get the directory name using import.meta
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    async sendMail({ emailTo, owner, violation, licensePlate, violationTime, imageUrl }) {
        try {
            const emailTemplatePath = 'views/email-template';
            const templateData = {
                ownerName: owner.name,
                licensePlate,
                violationTime,
                imageUrl,
            };

            const renderedHtml = await ejs.renderFile(
                path.join(__dirname, '..', `${emailTemplatePath}.ejs`),
                templateData
            );

            await transporter.sendMail({
                from: smtpEmail,
                to: emailTo,
                subject: "Thông báo vi phạm giao thông",
                html: renderedHtml,
            });

            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    },
};

Object.freeze(mailService);
export default mailService;
