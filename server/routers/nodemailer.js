import { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const router = Router();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
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

  transporter.sendMail(
    {
      to: process.env.USER,
      subject: subject,
      html: `<h1>${from}</h1><br>
      <h2>${subject}</h3><br>
      <p>${text}</p>`,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.send({ message: "mail sent" });
      }
    }
  );
});

export default router;
