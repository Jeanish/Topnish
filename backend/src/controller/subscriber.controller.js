import { Subscribe } from "../models/newsletter.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { transporter } from "../utils/mailer.js";
import { v4 as uuidv4 } from "uuid";

const handleSubscription = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  let subscriber = await Subscribe.findOne({ email });

  if (subscriber) {
    return res.status(400).json({ message: "Email is already subscribed" });
  }

  // Generate a unique coupon code
  const code = `WELCOME10-${uuidv4().slice(0, 6).toUpperCase()}`;

  const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000); // 6 hours
  // Save subscriber with code and default used=false
  subscriber = new Subscribe({ email, code });
  await subscriber.save();

  // Send coupon email
  const mailOptions = {
    from: `Topnish <contact@topnish.com>`,  // ✅ clearer sender format
    to: email,
    subject: "Your 10% Discount Code from Topnish",
    text: `
Thank you for subscribing to Topnish!

Your exclusive 10% discount code is: ${code}

Use it at checkout and enjoy your discount.

Note: This coupon is valid for 6 hours only. Please check your 'Promotions' or 'Spam' folders if you don't see this email in your inbox.
    `.trim(),
    html: `
      <p>Thank you for subscribing to <strong>Topnish</strong>!</p>
      <p>Your exclusive 10% discount code is: <strong>${code}</strong></p>
      <p>Use it at checkout and enjoy your discount.</p>
      <p><strong>Note:</strong> This coupon is valid for <strong>6 hours only</strong>.</p>
    `,
  };

  await transporter.sendMail(mailOptions);

  res.status(201).json({ message: "Successfully subscribed and coupon sent!" });
});

export { handleSubscription };
