USE questions;
DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
	id INTEGER NOT NULL AUTO_INCREMENT,
	username VARCHAR(256) NOT NULL,
	contents VARCHAR(1024) NOT NULL,
	problem CHAR NOT NULL,
	time timestamp NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
) CHARSET=utf8;
