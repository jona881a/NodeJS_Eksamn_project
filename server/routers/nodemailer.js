import { Router } from "express";
import nodemailer from "nodemailer";
import "dotenv/config";

const router = Router();

const transporter = await nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/sendmail", (req, res) => {
  const from = req.body.from;
  const subject = req.body.subject;
  const text = req.body.text;

  const mailOptions = {
    from: from,
    to: process.env.EMAIL_EMAIL,
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
