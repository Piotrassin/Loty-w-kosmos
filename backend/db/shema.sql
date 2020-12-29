-- drop schema `loty-w-kosmos`;

CREATE SCHEMA `loty-w-kosmos`;
USE `loty-w-kosmos`;
-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-01-09 12:36:09.593

-- tables
-- Table: Flight
CREATE TABLE Flight (
    Id int NOT NULL AUTO_INCREMENT,
    DepDate timestamp NOT NULL,
    ArrDate timestamp NOT NULL,
    Description varchar(127) NULL,
    Origin varchar(31) NOT NULL,
    Destination varchar(31) NOT NULL,
    CONSTRAINT Flight_pk PRIMARY KEY (Id)
);

-- Table: Ticket
CREATE TABLE Ticket (
    Id int NOT NULL AUTO_INCREMENT,
    SeatNumber int NOT NULL,
    Price decimal(8,2) NOT NULL,
    LuggageMass decimal(5,1) NOT NULL,
    LuggageX int NULL,
    LuggageY int NULL,
    LuggageZ int NULL,
    Flight_Id int NOT NULL,
    User_Id int NOT NULL,
    CONSTRAINT Ticket_pk PRIMARY KEY (Id)
);

-- Table: User
CREATE TABLE User (
    Id int NOT NULL AUTO_INCREMENT,
    FirstName varchar(31) NOT NULL,
    LastName varchar(64) NOT NULL,
    Birthdate date NULL,
    Weight decimal(3,1) NOT NULL,
    Email varchar(31) NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY (Id)
);

-- foreign keys
-- Reference: Ticket_Flight (table: Ticket)
ALTER TABLE Ticket ADD CONSTRAINT Ticket_Flight FOREIGN KEY Ticket_Flight (Flight_Id)
    REFERENCES Flight (Id) 
    ON DELETE CASCADE;

-- Reference: Ticket_User (table: Ticket)
ALTER TABLE Ticket ADD CONSTRAINT Ticket_User FOREIGN KEY Ticket_User (User_Id)
    REFERENCES User (Id);

-- End of file.