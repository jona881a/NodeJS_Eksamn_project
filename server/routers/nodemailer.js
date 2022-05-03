import { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const router = Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

router.post("/sendmail", (req, res) => {
  const from = req.body.from;
  const subject = req.body.subject;
  const text = req.body.text;

  const mailOptions = {
    from: from,
    to: process.env.USER,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send({ message: "mail sent" });
    }
  });
});

export default router;
