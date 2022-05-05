import { Router } from "express";
import db from "../database/createConnection.js";

const router = Router();

router.get("/store/getallgames", (req, res) => {
  db.query(
    `SELECT * FROM games JOIN gameimages ON (images_id = gameimages.id);`,
    (err, data) => {
      if (err) {
        res.send({ errorMessage: err });
      } else {
        res.send({ data });
      }
    }
  );
});

export default router;
