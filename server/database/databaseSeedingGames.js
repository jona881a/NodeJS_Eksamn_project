import db from "./createConnection.js";

db.query(`INSERT INTO games(title, genre, description, company, releasedate, price, images_id) VALUES
    ('Elden Ring','RPG, 3rd person, Open world', 
    
    'THE NEW FANTASY ACTION RPG.
    Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.
    • A Vast World Full of Excitement
    A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected. As you explore, the joy of discovering unknown and overwhelming threats await you, leading to a high sense of accomplishment.
    • An Epic Drama Born from a Myth
    A multilayered story told in fragments. An epic drama in which the various thoughts of the characters intersect in the Lands Between.',
    
    'Fromsoftware, Konami', '3.3.2020', 359, 1),

    ('Bayonetta','Action, 3rd person, Beat-em-up', null, 'Platinum games, Team Little Angels','1.2.2011', 74.68, 2),

    ('Need for Speed: Heat','Racing, Action', null,'EA','4.5.2020', 446.39, 3),

    ('Crysis 3: Remastered','Action, 1st-person shooter, Sci-fi', null,'EA, Crytek','5.1.2021', 223.16, 4),

    ('Salt and Sanctuary','RPG, 2D Platformer, Fantasy', null, 'Ska Studios','4.4.2016', 133.87, 5),

    ('Bugsnax','1st-person shooter, Puzzle, Adventure', null, 'Young Horses','2.6.2020', 165.04, 6)`
);

db.end();