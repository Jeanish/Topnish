import {Resend} from "resend";

// Initialize Resend with your API key

// Send OTP email
const sendOTPEmail = async (email, otp) => {
    try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const response = await resend.emails.send({
      from: "contact@topnish.com", // Your verified sender email
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    });

    console.log('✅ OTP email sent successfully:', response);
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

export { sendOTPEmail };
