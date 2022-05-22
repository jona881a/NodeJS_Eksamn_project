import { Router } from "express";
import db from "../database/createConnection.js";

const router = Router();

router.get("/store/getallgames", (req, res) => {
  db.query(
    `SELECT gameimages.cover_image, games.* FROM games JOIN gameimages ON (images_id = gameimages.id);`,
    (err, data) => {
      if (err) {
        res.send({ errorMessage: err });
      } else {
        res.send({ data });
      }
    }
  );
});

router.get("/store/getallgames/:id", (req, res) => {
  db.query(
    `SELECT * FROM games JOIN gameimages ON (images_id = gameimages.id) WHERE games.id = ?;`,
    Number(req.params.id),
    (err, data) => {
      if (err) {
        res.send({ errorMessage: err });
      } else {
        data[0].carousel_images = JSON.parse(data[0].carousel_images);
        res.send({ data: data[0] });
      }
    }
  );
});

router.get("/store/covergames", (req, res) => {
  db.query(`SELECT cover_image FROM gameimages;`, (err, data) => {
    if (err) {
      res.send({ errorMessage: err });
    } else {
      res.send({ data });
    }
  });
});

export default router;
