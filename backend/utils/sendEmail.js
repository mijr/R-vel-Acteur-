const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey', // This is literally the string 'apikey'
    pass: process.env.SENDGRID_API_KEY, // Your SendGrid API key
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: 'savanafusion@gmail.com', // Must be verified in SendGrid
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('❌ SMTP SendGrid error:', err);
    throw new Error('Failed to send email via SMTP');
  }
};

module.exports = sendEmail;
