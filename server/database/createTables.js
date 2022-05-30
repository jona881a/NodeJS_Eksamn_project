import db from "./createConnection.js";

let deleteMode = false;

if (deleteMode) {
  db.query(`DROP TABLE IF EXISTS reviews;`);
  db.query(`DROP TABLE IF EXISTS carts`);
  db.query(`DROP TABLE IF EXISTS users;`);
  db.query(`DROP TABLE IF EXISTS games;`);
  db.query(`DROP TABLE IF EXISTS gameimages;`);
  db.query(`DROP TABLE IF EXISTS gamekeys`);
} else {
  //TABLE: users
  db.query(
    `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(50),
    email VARCHAR(50),
    username VARCHAR(20),
    password VARCHAR(255),
    profile_pic MEDIUMTEXT
  );`
  );

  //TABLE: gameimages
  db.query(
    `CREATE TABLE IF NOT EXISTS gameimages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cover_image MEDIUMTEXT, 
    carousel_images JSON
  );`
  );

  //TABLE: games
  db.query(
    `CREATE TABLE IF NOT EXISTS games (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50),
    description VARCHAR(1000),
    genre VARCHAR(200),
    company VARCHAR(50),
    releasedate VARCHAR(10),
    price DOUBLE,
    images_id INT,
    FOREIGN KEY (images_id) REFERENCES gameimages(id)
  );`
  );
  //TABLE: keys
  db.query(
    `CREATE TABLE IF NOT EXISTS gamekeys (
      id INT PRIMARY KEY AUTO_INCREMENT,
      game_keys JSON
    );`
  );

  //TABLE: carts
  db.query(
    `CREATE TABLE IF NOT EXISTS carts (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT,
      total_price DOUBLE,
      order_items JSON,
      game_keys_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (game_keys_id) REFERENCES gamekeys(id)
    );`
  );

  //TABLE: reviews
  db.query(
    `CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    game_id INT,
    user_id INT,
    review_content VARCHAR(500),
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`
  );
}
db.end();
