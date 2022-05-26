import { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import htmlMailTemplate from "../html/verificationmailTemplate.js";
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
        res.send({ message: "mail sent" });
      }
    }
  );
});

router.post("/sendmailverification", (req, res) => {
  const to = req.body.email;

  transporter.sendMail(
    {
      from: process.env.USER,
      to: to,
      subject: "Welcome",
      html: htmlMailTemplate,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.send({ message: "mail sent" });
      }
    }
  );
});

export default router;
