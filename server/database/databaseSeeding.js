import db from "./createConnection.js";

db.query(`INSERT INTO games(tilte,platform,genre,company,rating)
VALUES('','','','',''),
('','','','',''),
('','','','',''),
('','','','',''),
('','','','',''),
('','','','','')`);

db.end();
