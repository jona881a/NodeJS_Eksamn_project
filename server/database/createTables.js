import db from "./createConnection.js";

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

//TABLE: games

db.end();
