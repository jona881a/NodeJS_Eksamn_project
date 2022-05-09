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
        let gameArray = [];

        data.forEach((element) => {
          element.carousel_images = JSON.parse(element.carousel_images);
          gameArray.push(element);
        });
        res.send({ data: gameArray });
      }
    }
  );
});

export default router;
