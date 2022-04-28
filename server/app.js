import express from "express";
import authRouter from "./routers/auth.js";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use(authRouter);

server.listen(3000);
