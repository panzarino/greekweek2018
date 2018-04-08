DROP DATABASE IF EXISTS gw2018;

CREATE DATABASE gw2018;

USE gw2018;

CREATE TABLE user(
                   `id` int NOT NULL AUTO_INCREMENT,
                   `username` varchar(100) NOT NULL,
                   `password` varchar(100) NOT NULL,
                   `admin` bit NOT NULL,
                   PRIMARY KEY (`id`)
                 );

CREATE TABLE post(
                   `id` int NOT NULL AUTO_INCREMENT,
                   `owner` int NOT NULL,
                   `title` varchar(100) NOT NULL,
                   `content` varchar(1000) NOT NULL,
                   `type` int NOT NULL,
                   PRIMARY KEY (`id`)
                 );

CREATE TABLE permission(
                   `id` int NOT NULL AUTO_INCREMENT,
                   `owner` int NOT NULL,
                   `category` int NOT NULL,
                   PRIMARY KEY (`id`)
                 );

CREATE TABLE `like`(
                   `id` int NOT NULL AUTO_INCREMENT,
                   `owner` int NOT NULL,
                   `post` int NOT NULL,
                   PRIMARY KEY (`id`)
                 );

INSERT INTO user (username, password, admin) VALUES ('Lambda Chi', 'password', true);
INSERT INTO permission (owner, category) VALUES (1,0), (1,1), (1,2), (1,3), (1,4);
INSERT INTO user (username, password, admin) VALUES ('Delta Frat', 'password', false);
INSERT INTO permission (owner, category) VALUES (2,0), (2,1), (2,2), (2,3), (2,4);

INSERT INTO post (title, content, type, owner) VALUES
("Vendor Review", "Vendor: Moe's Southwest Grill<br><a href='http://www.moes.com'>http://www.moes.com</a><br>Rating: 5/5<br>Body: We organized a hackathon this week, and selected Moe's for catering. They provided enormous amounts of guac, and everyone was satisfied.",2,1),
("Chapter Presentation", "Presentor: GTPD<br>Body: Our risk manager organized a presentation from GTPD about social events. This improved our understanding of the relationship between GTPD and the Greek community.",0,2),
("Question about Food Service", "We recently switched our food service vendor to ABC, and after a year they want to raise our rates. Has anyone else using this vendor experienced anything similar?",0,1),
("Philanthropy Question", "We do philanthropy with Atlanta Food Bank, and were wondering if any other Org's want to do a joint philanthropy event? We can offer refreshments and rides.<br>Contact Philanthropy Chair John Cena (404) 555-6666 for details",4,2);

