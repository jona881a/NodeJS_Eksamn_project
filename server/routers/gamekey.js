import { Router } from "express";
import db from "../database/createConnection.js";

const router = Router();

router.post("/gamekey/getgamekey/:id/:username", (req, res) => {
  const id = Number(req.params.id);
  const title = req.body.gameTitle;
  const username = req.params.username;

  if (req.session.user.username === username) {
    db.query(
      `SELECT game_keys FROM gamekeys JOIN carts on (game_keys_id = gamekeys.id) WHERE carts.id = ?`,
      [id],
      (err, data) => {
        if (data[0]) {
          const gameKeys = JSON.parse(data[0].game_keys);
          const key = gameKeys.find((key) => key.game === title);
          res.send({ key });
        } else {
          console.error(err);
        }
      }
    );
  }
});

export default router;
