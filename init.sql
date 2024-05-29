-- Create database
CREATE DATABASE IF NOT EXISTS faculty_reg;

-- Use the database
USE faculty_reg;

-- Create tables

CREATE TABLE IF NOT EXISTS `users` (
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(90) NOT NULL,
  `password` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `application_id` int NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `application_id_UNIQUE` (`application_id`)
) ;

insert into users values("abc","kdfjldkfj","jjjj@gmail.com","e","UR",4);

CREATE TABLE IF NOT EXISTS `page1` (
  `email` varchar(100) NOT NULL,
  `page1_data` json DEFAULT NULL,
  PRIMARY KEY (`email`)
);

CREATE TABLE IF NOT EXISTS `page2` (
  `email` varchar(100) NOT NULL,
  `page2_data` json DEFAULT NULL,
  PRIMARY KEY (`email`)
) ;

CREATE TABLE IF NOT EXISTS `page3` (
  `email` varchar(100) NOT NULL,
  `page3_data` json DEFAULT NULL,
  PRIMARY KEY (`email`)
);

CREATE TABLE IF NOT EXISTS `page4` (
  `email` varchar(100) NOT NULL,
  `page4_data` json DEFAULT NULL,
  PRIMARY KEY (`email`)
) ;

CREATE TABLE IF NOT EXISTS `page5` (
  `email` varchar(100) NOT NULL,
  `page5_data` json DEFAULT NULL,
  PRIMARY KEY (`email`)
) ;

CREATE TABLE IF NOT EXISTS `page6` (
  `email` varchar(100) NOT NULL,
  `page6_data` json DEFAULT NULL,
  PRIMARY KEY (`email`)
) ;

CREATE TABLE IF NOT EXISTS `page7` (
  `email` varchar(100) NOT NULL,
  `page7_data` json DEFAULT NULL,
  PRIMARY KEY (`email`)
);

CREATE TABLE IF NOT EXISTS `page8` (
  `email` varchar(100) NOT NULL,
  `page8_data` json DEFAULT NULL,
  PRIMARY KEY (`email`)
);









