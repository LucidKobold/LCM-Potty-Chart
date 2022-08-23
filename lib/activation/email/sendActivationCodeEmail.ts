import nodemailer from "nodemailer";

// TODO: Theme the message and add the LCM and Potty Chart logo to the email.

const sendActivationCodeEmail = (
  activationCode: string,
  userEmail: string,
  name = "User"
): void => {
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
      <p><a href="${process.env.NEXTAUTH_URL}/auth/activate/${activationCode}">Activate your account.</a></p>
      <p>You are receiving this email because your email was used to register an account within the app.</p>
      <p>If you did not try to register an account please disregard this email and your account will be deleted within a few days.</p>
      <div>
      <p>If you are have access with the link above try to manually activate your account with the following link:</P
      <p><a><a href="${process.env.NEXTAUTH_URL}/auth/activate">Manual activation (https://${process.env.NEXTAUTH_URL}/auth/activate)</a></a></p>
      <p>Activation code:</p>
      <p><strong>${activationCode}</strong></p>
      </div>
    </div>
    `
  };

  transporter.sendMail(message);
};

export default sendActivationCodeEmail;
