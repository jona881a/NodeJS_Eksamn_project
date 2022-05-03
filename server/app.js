import express from "express";
import cors from "cors";
import session from "express-session";
import authRouter from "./routers/auth.js";
import mailRouter from "./routers/nodemailer.js";


import http from "http";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.json());
app.use(authRouter);
app.use(mailRouter);

server.listen(3000);
