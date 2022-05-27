import express from "express";
import cors from "cors";
import session from "express-session";
import { Server } from "socket.io";
import authRouter from "./routers/auth.js";
import mailRouter from "./routers/nodemailer.js";
import adminRouter from "./routers/admin.js";
import storeRouter from "./routers/store.js";
import reviewRouter from "./routers/reviews.js";
import cartRouter from "./routers/cart.js";
import gamekeyRouter from "./routers/gamekey.js";
import http from "http";
import path from "path";

const app = express();

app.use(express.static(path.resolve("../client/public/")));

app.use(express.json({ limit: "50mb" }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(authRouter);
app.use(mailRouter);
app.use(adminRouter);
app.use(storeRouter);
app.use(reviewRouter);
app.use(cartRouter);
app.use(gamekeyRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(
    `One client has been connected with id: ${socket.id}. Total clients: ${io.engine.clientsCount}`
  );

  socket.on("open-chat", ({ username }) => {
    socket.join(username);
    io.to(username).emit("chat-started", {
      message:
        "Welcome to Digi-Keystore supportchat! a supporter will be with you shortly...",
    });
  });
  socket.on("send-message", ({ message, username }) => {
    io.emit("message-recieved", {
      message,
      username,
    });
  });
  socket.on("send-reply", ({ message, username }) => {
    io.to(username).emit("reply", { message });
  });
});

server.listen(3000);
