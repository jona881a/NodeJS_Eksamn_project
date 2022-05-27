import { Router } from "express";
import db from "../database/createConnection.js";
import code from "../keygenerator/keygenerator.js";

const router = Router();

async function generateKeys(order) {
  let gameKeys = [];

  order.orderItems.forEach((item) => {
    code.get((error, code) => {
      if (error) return console.error(error);
      gameKeys.push({ game: item.title, gamekey: code });
    });
  });
  return gameKeys;
}

router.post("/cart/checkout/:id", async (req, res) => {
  const userId = Number(req.params.id);
  const order = req.body;
  const gameKeys = await generateKeys(order);

  db.query(
    `INSERT INTO gamekeys(game_keys) VALUES(?)`,
    [JSON.stringify(gameKeys)],
    (err, data) => {
      if (data.affectedRows === 1) {
        db.query(
          `SELECT * FROM gamekeys ORDER BY id DESC LIMIT 1;`,
          (err, data) => {
            if (data) {
              db.query(
                `INSERT INTO carts(user_id, total_price, order_items,game_keys_id) VALUES(?,?,?,?)`,
                [
                  userId,
                  order.totalPrice.toFixed(2),
                  JSON.stringify(order.orderItems),
                  data[0].id,
                ],
                (err, data) => {
                  if (data.affectedRows === 1) {
                    res.send({
                      message:
                        "Go to your profile in order to reveal your new keys and start playing!",
                    });
                  } else {
                    res.send({
                      errorMessage:
                        "an error occured and your purchase did not go through",
                    });
                    console.log(err);
                  }
                }
              );
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/cart/getorders/:id/", (req, res) => {
  const userId = Number(req.params.id);

  if (req.session.user) {
    db.query(
      `SELECT id,total_price, order_items FROM carts WHERE user_id = ?`,
      [userId],
      (err, data) => {
        if (data.length !== 0) {
          data.forEach((row) => {
            row.order_items = JSON.parse(row.order_items);
          });
          res.send({ data });
        } else {
          res.send({
            errorMessage:
              "An error occured or you might not have any orderhistory yet",
          });
          console.log(err);
        }
      }
    );
  } else {
    res.send({
      errorMessage: "Your not logged in, log in in order to see order history",
    });
  }
});

export default router;
