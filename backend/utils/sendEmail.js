const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from: 'savanafusion@gmail.com', 
      subject,
      html
    };

    await sgMail.send(msg);
  } catch (err) {
    console.error('❌ SendGrid error:', err.response?.body || err.message);
    console.error('Full error:', err);
    throw new Error("Échec de l'envoi de l'email : Failed to send email");
  }
};

module.exports = sendEmail;
