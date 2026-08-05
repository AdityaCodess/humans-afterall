import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,    
  },
});

export const sendOtpEmail = async (to: string, code: string) => {
  await transporter.sendMail({
    from: '"Humans After All" <no-reply@humansafterall.com>',
    to,
    subject: 'Your Access Code',
    html: `
      <div style="font-family: sans-serif; background: #09090b; color: #fff; padding: 20px; border-radius: 8px;">
        <h2 style="color: #10b981;">Authentication Code</h2>
        <p>Use the following code to enter the simulation:</p>
        <h1 style="letter-spacing: 4px; color: #10b981;">${code}</h1>
        <p style="color: #71717a; font-size: 12px;">This code will expire in 10 minutes.</p>
      </div>
    `,
  });
};