import nodemailer from "nodemailer";

export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
    },
  });

  async sendMail(to: string, subject: string, html: string) {
    try {
      const from =
        process.env.SMTP_FROM ||
        process.env.SMTP_USER ||
        process.env.EMAIL_USER;

      return await this.transporter.sendMail({
        from,
        to,
        subject,
        html,
      });
    } catch (error) {
      throw error;
    }
  }
}