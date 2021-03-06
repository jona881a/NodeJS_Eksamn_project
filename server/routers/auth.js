import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../database/createConnection.js";

const router = Router();
const saltRounds = 12;
let userToSend;

/******************************/
/***********Functions**********/
/******************************/

async function checkLoginInfo(req, res, next) {
  const user = req.body;

  db.query(
    `SELECT * FROM users WHERE username = ?`,
    [user.username],
    async (err, data) => {
      let foundUser = data[0];

      if (foundUser != undefined && user.username == foundUser.username) {
        const correctPassword = await bcrypt.compare(
          user.password,
          foundUser.password
        );
        if (correctPassword) {
          userToSend = {
            id: foundUser.id,
            fullname: foundUser.fullname,
            email: foundUser.email,
            username: foundUser.username,
            profile_pic: foundUser.profile_pic,
          };
          next();
        } else {
          res
            .status(404)
            .send({ message: "Username or password is not correct" });
        }
      } else {
        res
          .status(404)
          .send({ message: "Username or password is not correct" });
      }
    }
  );
}

async function createUser(req, res, next) {
  const user = req.body;
  db.query(
    `SELECT * FROM users WHERE username = ?`,
    [user.username],
    async (err, data) => {
      if (!data[0]) {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        const newUser = { ...user, password: hashedPassword };

        db.query(
          `INSERT INTO users(fullname,email,username,profile_pic,password) VALUES(?, ?, ?, ?, ?)`,
          [
            newUser.fullname,
            newUser.email,
            newUser.username,
            newUser.profile_pic,
            newUser.password,
          ]
        );
        next();
      } else {
        //409: Conflict
        res.status(409).send({
          message: `User with ${user.username} already exists. `,
        });
      }
    }
  );
}

async function changepassword(req, res, next) {
  const user = req.body;
  
  db.query(
    `SELECT * FROM users WHERE username = ?`,
    [user.username],
    async (err, data) => {
      let existingUser = data[0];
      if (existingUser !== undefined && await bcrypt.compare( user.password, existingUser.password )) {
        let newHashedPassword = await bcrypt.hash(user.newPassword, saltRounds)
        db.query(
          `UPDATE users SET password = ? WHERE username = ?`,
          [newHashedPassword, user.username],
          (err, data) => {
            if (err) {
              console.log(err);
              res
              .status(404)
              .send({errMessage: "An unexpected error has occured, check sql syntax"});
            } else {
              next();
            }
          }
        );
      } else {
        res.status(409).send({errMessage: "Incorrect username or password"})
      }
    }
  );
}

async function updateUser(req, res, next) {
  const user = req.body;

  db.query(
    `SELECT * FROM users WHERE username = ?`,
    [user.username],
    async (err, data) => {
      let foundUser = data[0];

      if (foundUser != undefined && user.username == foundUser.username) {
        db.query(
          `UPDATE users SET fullname = ?, email = ? WHERE username = ?`,
          [user.fullname, user.email, user.username],
          (err, data) => {
            if (err) {
              console.log(err);
              res.status(404).send({
                message: "An error has occured, user cannot be found",
              });
            }
            userToSend = user;
            next();
          }
        );
      } else {
        res.status(404).send({ message: "The user cannot be found" });
      }
    }
  );
}

/****************************/
/***********Routes***********/
/****************************/

router.post("/auth/login", checkLoginInfo, (req, res) => {
  if (userToSend.username === "admin") {
    req.session.admin = true;
  } else {
    req.session.admin = false;
  }
  req.session.user = userToSend;
  res.status(200).send({ session: req.session });
});

router.get("/auth/signout", (req, res) => {
  req.session.destroy;
  userToSend = null;
  res.status(200).send({ message: "You logged out" });
});

router.post("/auth/signup", createUser, (req, res) => {
  res.status(201).send({
    message: `Successfully created user, you may now login`,
  });
});

router.patch("/auth/changepassword", changepassword, (req, res) => {
  res.status(200).send({ message: "Password changed successfully" });
});

router.put("/auth/update", updateUser, (req, res) => {
  res.status(200).send({ changedUser: userToSend });
});

export default router;