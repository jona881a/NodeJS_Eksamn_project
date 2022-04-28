import express from "express";
import authRouter from "./routers/auth.js";
import mailRouter from "./routers/nodemailer.js";


import http from "http";

const app = express();
const server = http.createServer(app);

app.use(authRouter);
app.use(mailRouter);

server.listen(3000);
