DROP DATABASE IF EXISTS movies_to_watch_DB;

CREATE DATABASE movies_to_watch_DB;

USE movies_to_watch_DB;

CREATE TABLE to_see_list (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(125) NOT NULL,
    watched BOOLEAN NOT NULL DEFAULT FALSE;
    PRIMARY KEY (id)
);

INSERT INTO to_see_list (name)
VALUES ("Ready Player One"), ("Sorry to Bother You");