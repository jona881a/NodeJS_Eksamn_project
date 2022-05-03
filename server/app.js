import express from "express";
import authRouter from "./routers/auth.js";
import mailRouter from "./routers/nodemailer.js";
import cors from "cors";


import http from "http";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(mailRouter);

server.listen(3000);
