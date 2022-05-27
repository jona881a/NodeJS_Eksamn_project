import db from './createConnection.js'

db.query(`INSERT INTO reviews(game_id, user_id, review_content) VALUES
    (1, 1, "Elden Ring is a great game!!!1!"),
    (1, 2, "This game is too hard. Would not recommend")`
)

db.end();