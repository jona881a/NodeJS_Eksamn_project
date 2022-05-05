import db from "./createConnection.js";

//Excluding 'rating'
db.query(`INSERT INTO games(title,genre,company, releasedate) 
VALUES('Elden Ring','RPG, 3rd person, Open world','Fromsoftware, Konami', '3.3.2020'),
('Bayonetta','Action, 3rd person, Beat-em-up','Platinum games, Team Little Angels','1.2.2011'),
('Need for Speed: Heat','Racing, Action','EA','4.5.2020'),
('Crysis 3: Remastered','Action, 1st-person shooter, Sci-fi','EA, Crytek','5.1.2021'),
('Salt and Sanctuary','RPG, 2D Platformer, Fantasy','Ska Studios','4.4.2016'),
('Bugsnax','1st-person shooter, Puzzle, Adventure','Young Horses','2.6.2020')`);

db.end();
