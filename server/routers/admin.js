import { Router } from "express";
import db from "../database/createConnection.js";

const router = Router();

router.post("/admin/addproducts", (req, res) => {
  const gameproduct = req.body;
  if (req.session.admin === true) {
    db.query(
      `INSERT INTO gameimages(cover_image, carousel_images) VALUES(?, JSON_ARRAY(?));`,
      [gameproduct.cover_image, gameproduct.carousel_images],
      (err, data) => {
        if (err) {
          res.send({ errorMessage: err });
          console.log(err);
        } else if (data.affectedRows === 1) {
          db.query(
            `SELECT * FROM gameimages ORDER BY id DESC LIMIT 1;`,
            (err, data) => {
              if (err) {
                res.send({ errorMessage: "The data could not be obtained" });
              } else if (data[0]) {
                db.query(
                  `INSERT INTO games(title, genre, company, description, price, releasedate, images_id) VALUES(?,?,?,?,?,?,?)`,
                  [
                    gameproduct.title,
                    gameproduct.genre,
                    gameproduct.company,
                    gameproduct.description,
                    gameproduct.price,
                    gameproduct.releasedate,
                    data[0].id,
                  ],
                  (err, data) => {
                    if (err) {
                      res.send({ errorMessage: err });
                    } else {
                      res.send({
                        message:
                          "Successfully added new game to the gamecatalog",
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } else {
    res.send({
      errorMessage:
        "You are not the admin and therefore you are not allowed to do the action",
    });
  }
});

export default router;
