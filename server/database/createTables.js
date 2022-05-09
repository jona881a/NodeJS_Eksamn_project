import db from "./createConnection.js";

let deleteMode = false;

if (deleteMode) {
  db.query(`DROP TABLE IF EXISTS users;`);
  db.query(`DROP TABLE IF EXISTS games;`);
  db.query(`DROP TABLE IF EXISTS gameimages;`);
} else {
  //TABLE: users
  db.query(
    `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(50),
    email VARCHAR(50),
    username VARCHAR(20),
    password VARCHAR(255)
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
    genre VARCHAR(200),
    company VARCHAR(50),
    releasedate VARCHAR(10),
    price DOUBLE,
    images_id INT,
    FOREIGN KEY (images_id) REFERENCES gameimages(id)
  );`
  );
}
db.end();
