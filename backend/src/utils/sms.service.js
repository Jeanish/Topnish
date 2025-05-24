import axios from "axios";
import qs from "qs";

export const sendOTP = async (phone, otp) => {
  try {
    const data = qs.stringify({
      variables_values: otp,
      route: "otp",
      numbers: phone,     
      flash: '1',             // Optional: Use flash messages

    });

    const res = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      data,
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("✅ OTP sent successfully:", res.data);
  } catch (error) {
    if (error.response) {
      console.error("❌ Error sending OTP:", error.response.data);
    } else {
      console.error("❌ Error sending OTP:", error.message);
    }
    throw new Error("Failed to send OTP");
  }
};
