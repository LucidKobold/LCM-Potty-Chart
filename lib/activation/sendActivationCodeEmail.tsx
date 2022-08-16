import nodemailer from "nodemailer";

// TODO: Theme the message and add the LCM and Potty Chart logo to the email.

const sendActivationCodeEmail = (
  activationCode: string,
  userEmail: string,
  name = "User"
) => {
  console.info("Send message.");
  // Environment
  const environment = process.env.NODE_ENV || "development";

  const port: 465 | 587 = environment === "production" ? 465 : 587;

  const server = {
    host: process.env.SMTP_SERVER_HOST,
    port: port,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    }
  };

  const transporter = nodemailer.createTransport(server);

  const message = {
    from: `"Lucid Creations Media no-reply" <${process.env.EMAIL_FROM}>`,
    to: `${userEmail}`,
    subject: `Hello ${name}, please activate your account for LCM Potty Chart with the lint provided.`,
    html: `
    <div>
      <a href="${process.env.NEXTAUTH_URL}/auth/activate/${activationCode}">Activate your account.</a>
    </div>
    `
  };

  transporter.sendMail(message);
};

export default sendActivationCodeEmail;
