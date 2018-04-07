DROP DATABASE IF EXISTS gw2018;

CREATE DATABASE gw2018;

USE gw2018;

CREATE TABLE user(
                   `id` int NOT NULL AUTO_INCREMENT,
                   `username` varchar(100) NOT NULL,
                   `password` varchar(100) NOT NULL,
                   PRIMARY KEY (`id`)
                 );

CREATE TABLE post(
                   `id` int NOT NULL AUTO_INCREMENT,
                   `title` varchar(100) NOT NULL,
                   `content` varchar(100) NOT NULL,
                   PRIMARY KEY (`id`)
                 );
