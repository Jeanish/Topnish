// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

export const otpRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1, // Limit each IP/phone to 1 request per minute
  message: { message: 'Please wait before requesting another OTP' },
});
