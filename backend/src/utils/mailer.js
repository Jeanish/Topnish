import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 587,
  auth: {
    user: "resend", 
    pass: process.env.RESEND_API_KEY,
  },
});
