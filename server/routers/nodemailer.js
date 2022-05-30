import { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {mailTemplateHead, mailTemplateBody} from "../html/verificationmailTemplate.js";
dotenv.config();
const router = Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/sendmail", (req, res) => {
  const from = req.body.from;
  const subject = req.body.subject;
  const text = req.body.text;

  transporter.sendMail(
    {
      to: process.env.EMAIL_USER,
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
  const username = req.body.username;

  transporter.sendMail(
    {
      from: process.env.EMAIL_USER,
      to: to,
      subject: `Welcome, ${username}`,
      html: `${mailTemplateHead}
             <h2>Welcome, ${username}!</h2>
            ${mailTemplateBody}`,
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
