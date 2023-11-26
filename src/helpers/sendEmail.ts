import nodemailer from 'nodemailer';
import config from '../config';

export type ContactMessage = {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string;
};

const sendEmailTo = async (message: ContactMessage) => {
    const transporter = nodemailer.createTransport({
        host: config.email_send.host,
        port: Number(config.email_send.port),
        secure: false,
        auth: {
            user: config.email_send.auth.user,
            pass: config.email_send.auth.pass,
        },
    });

    await transporter.sendMail({
        from: `${message.email}`,
        to: config.email_send.auth.user,
        subject: `New Contact Message - ${config.email_send.app_name}`,
        html: `
      <div style="width: 100%; height: auto; padding: 15px 10px; text-align: left;">
        <h1 style="font-size: 25px;">New Contact Message</h1>
        <div>
          <p><strong>Name:</strong> ${message.name}</p>
          <p><strong>Email:</strong> ${message.email}</p>
          <p><strong>Phone:</strong> ${message.phone}</p>
          <p><strong>Subject:</strong> ${message.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.message}</p>
        </div>
      </div>
    `,
    });
};

export default sendEmailTo;
