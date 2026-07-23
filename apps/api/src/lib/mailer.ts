import { env } from '@/env.js';
import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth:
        env.SMTP_USER && env.SMTP_PASSWORD
            ? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD }
            : undefined,
});

export type SendMailInput = {
    to: string;
    subject: string;
    html: string;
    text?: string;
};

export const sendMail = async ({ to, subject, html, text }: SendMailInput) => {
    return mailer.sendMail({
        from: env.SMTP_FROM,
        to,
        subject,
        html,
        text,
    });
};
