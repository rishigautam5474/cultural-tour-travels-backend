import env from "dotenv";
env.config();
import Message from "../models/message.model.js";
import nodemailer from "nodemailer";

const auth = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 456,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMessage = async (req, res) => {
  const { name, email, subject, message } = req?.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "All fields are required",
    });
  }

  const receiver = {
    to: email,
    from: "rishigautam5474@gmail.com",
    subject: "Regarding Cultural Trips Website",
    html: `
    <h1>Hii ${name},</h1>
    <p>Thank you for reaching out to me through my portfolio. I have received your message and will get back to you soon!</p>
    <h2>Details of Your Message:</h2>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Subject:</strong> ${subject}</li>
      <li><strong>Message:</strong> ${message}</li>
    </ul>
    <p>If you have any additional information to share, feel free to reply to this email.</p>
    <p>Best regards,</p>
    <p><strong>Rishi Gautam</strong></p>
    <p><a href="https://your-portfolio-link.com">Visit My Portfolio</a></p>
    `,
  };

  const createMessage = await Message.create({ name, email, subject, message });

  auth.sendMail(receiver, (error, emailResponse) => {
    if (error) throw error;
    // console.log("success!");
    response.end();
  });

  return res.status(201).json({
    success: true,
    error: false,
    message: "Successfully send your message",
    data: createMessage,
  });
};

const accessAllMessage = async (req, res) => {
  const msg = await Message.find({});

  if (!msg) {
    return res
      .status(400)
      .json({ success: false, error: true, message: "Data not found" });
  }

  return res.status(200).json({ success: true, error: false, data: msg });
};

export { sendMessage, accessAllMessage };
