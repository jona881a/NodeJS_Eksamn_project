import express from "express";
import authRouter from "./routers/auth.js";

const app = express();
app.use(authRouter);
