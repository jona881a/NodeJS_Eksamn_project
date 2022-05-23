import express from "express";
import cors from "cors";
import session from "express-session";
import { Server } from "socket.io";
import authRouter from "./routers/auth.js";
import mailRouter from "./routers/nodemailer.js";
import adminRouter from "./routers/admin.js";
import storeRouter from "./routers/store.js";
import reviewRouter from "./routers/reviews.js";

import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(session));

app.use(express.json({ limit: "50mb" }));
app.use(authRouter);
app.use(mailRouter);
app.use(adminRouter);
app.use(storeRouter);
app.use(reviewRouter);

server.listen(3000);
