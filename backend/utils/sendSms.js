const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSms = async (to, message) => {
  try {
    const msg = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to, // recipient phone number in E.164 format, e.g. "+1234567890"
    });
    console.log('✅ SMS sent:', msg.sid);
  } catch (error) {
    console.error('❌ Twilio SMS error:', error);
    throw new Error('Failed to send SMS');
  }
};

module.exports = sendSms;
