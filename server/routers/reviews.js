import { Router } from "express";
import db from '../database/createConnection.js';

const router = Router();
let reviewsToSend;
let userCreatedReview;

async function getReviews(req, res, next) {
    let game_id = req.body.game_id;

    db.query(
        `SELECT reviews.review_content, users.username, users.profile_pic
        FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviews.game_id = ?`,
        [game_id],
        async (err, data) => {
            if (data !== undefined) {
                reviewsToSend = data;
                next();
            } else {
                res.status(404).send({ message: "The game cannot be found" });
            }
        }
    );
}

async function addReview(req, res, next) {
    if (!req.session) {
        res.status(409).send({ message: "The user is not logged in" });
    } else {
        db.query(
            `INSERT INTO reviews(game_id, user_id, review_content) VALUES(?, ?, ?)`,
            [req.body.game_id, req.body.user_id, req.body.review_content],
            async (err, data) => {
                if (data.affectedRows === 1) {
                    db.query(
                        'SELECT * FROM reviews ORDER BY id DESC LIMIT 1;',
                        async (err, data) => {
                            userCreatedReview = data[0];
                            userCreatedReview.username = req.body.username;
                            userCreatedReview.profile_pic = req.body.profile_pic; 
                            next();
                        }
                        )
                } else {
                    res.status(404).send({ message: "The review was not saved correctly" });
                }
            }
        );
    }
}

router.post("/reviews", getReviews, (req, res) => {
    res.status(200).send({ reviews: reviewsToSend });
});

router.post("/createReview", addReview, (req, res) => {
    res.status(200).send({ review: userCreatedReview });
});

export default router