-- IF YOU NEED TO RESET THE DB
DROP TABLE enrollment;
DROP TABLE game;
DROP TABLE player;
DROP TABLE location;


-- TO CREATE THE DB
CREATE TABLE location (
 id             SERIAL          NOT NULL,
 name           TEXT            NOT NULL     UNIQUE,
 PRIMARY KEY( id )
);

INSERT INTO location (name)
VALUES
 ('Hogwarts School of Witchcraft and Wizardry'),
 ('Beauxbatons Academy of Magic'),
 ('Koldovstoretz');




CREATE TABLE player (
 id             SERIAL          NOT NULL,
 name           TEXT            NOT NULL,
 username       TEXT            NOT NULL    UNIQUE,
 password       TEXT            NOT NULL,
 location_id    INT             NOT NULL,

 PRIMARY KEY( id ),
 FOREIGN KEY (location_id) REFERENCES location(id)
);

INSERT INTO player (name, username, password, location_id)
VALUES
 ('harry', 'chosenOne', 'pass123', 1),
 ('dubledore', 'theGreat', 'pass123', 1),
 ('Hermione Granger', 'smarterThanYou', 'pass123', 1),
 ('Snape', 'halfBloodPrince', 'pass123', 1),
 ('grindelwald', 'OGDarkLord', 'pass123', 1),
 ('dobby', 'freeHouseElf', 'pass123', 1);



CREATE TABLE game (
 id             SERIAL          NOT NULL,
 title          TEXT            NOT NULL,
 host_id        INT             NOT NULL,
 state          INT             NOT NULL, -- 0 = enrolling, 1 = active, 2 = finshed
 location_id    INT             NOT NULL,

 PRIMARY KEY( id ),
 FOREIGN KEY (host_id) REFERENCES player(id),
 FOREIGN KEY (location_id) REFERENCES location(id)
);

INSERT INTO game (title, host_id, state, location_id)
VALUES
 ('Triwizard Tournament', 2, 0, 1);




 CREATE TABLE enrollment (
  id                SERIAL         NOT NULL,
  user_id           INT            NOT NULL,
  game_id           INT            NOT NULL,
  target_id         INT                    ,

  PRIMARY KEY( id ),
  FOREIGN KEY (user_id) REFERENCES player(id),
  FOREIGN KEY (game_id) REFERENCES game(id),
  FOREIGN KEY (target_id) REFERENCES player(id)
 );

 INSERT INTO enrollment (user_id, game_id)
 VALUES
  (1, 1),
  (3, 1),
  (4, 1),
  (5, 1);
