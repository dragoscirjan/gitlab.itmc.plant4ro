DROP DATABASE `donations`;
CREATE DATABASE `donations`;
USE `donations`;

CREATE TABLE IF NOT EXISTS `donator` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(256) DEFAULT '',
    `email` VARCHAR(256) DEFAULT '',
    `company` VARCHAR(256) DEFAULT '',
    `companyId` VARCHAR(256) DEFAULT '',
    `phone` VARCHAR(256) DEFAULT '',
    `location` VARCHAR(256) DEFAULT '',
    `locationGps` VARCHAR(256) DEFAULT '',
    PRIMARY KEY(`id`)
);


CREATE TABLE IF NOT EXISTS `donation` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `donatorId` INT NOT NULL DEFAULT 0,
    `donation` DECIMAL(10,2) NOT NULL DEFAULT 0,
    `currency` VARCHAR(3) NOT NULL DEFAULT 'RON',
    `exchange` DECIMAL(6,4) NOT NULL DEFAULT 0,
    `trees` INT NOT NULL DEFAULT 0,
    `startingCode` INT NOT NULL DEFAULT 0,
    `started` INT NOT NULL DEFAULT 0,
    `completed` INT NOT NULL DEFAULT 0,
    `transactions` BLOB DEFAULT '',
    PRIMARY KEY(`id`)
);


CREATE TABLE IF NOT EXISTS `diplomas` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `donatorId` INT NOT NULL DEFAULT 0,
    `donationId` INT NOT NULL DEFAULT 0,
    `diplomaType` TINYINT NOT NULL DEFAULT 0,
    `sent` INT NOT NULL DEFAULT 0,
    PRIMARY KEY(`id`)
);
