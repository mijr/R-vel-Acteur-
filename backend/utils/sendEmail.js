const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from: 'savanafusion@gmail.com', // Replace with your verified sender
      subject,
      html
    };

    await sgMail.send(msg);
  } catch (err) {
    console.error('❌ Failed to send email:', err.response?.body || err.message);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
