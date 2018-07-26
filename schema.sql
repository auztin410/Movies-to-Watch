DROP table IF EXISTS to_see_list;

CREATE TABLE to_see_list (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(125) NOT NULL,
    watched BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt timestamp NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (id)
);

INSERT INTO to_see_list (name)
VALUES ("Ready Player One"), ("Sorry to Bother You");