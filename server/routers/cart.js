import { Router } from "express";
import db from "../database/createConnection.js";

const router = Router();

router.post("/cart/checkout/:id", (req, res) => {
  const userId = Number(req.params.id);
  const order = req.body;

  db.query(
    `INSERT INTO(user_id, total_price, order_items) VALUES(?,?,?)`,
    [userId, order.totalPrice, order.orderItems],
    (err, data) => {
      if (data) {
        console.log(data);
      } else {
        console.log(err);
      }
    }
  );
});

export default router;
