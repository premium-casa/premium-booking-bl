DROP DATABASE IF EXISTS booking;

CREATE DATABASE booking;

USE booking;


CREATE TABLE rooms (
   id int PRIMARY KEY,
   roomname text NOT NULL,
   price int NOT NULL,
   cleaning_fee int NOT NULL,
   service_fee int NOT NULL,
   tax int NOT NULL,
   max_adult int NOT NULL,
   max_child int NOT NULL,
   max_infant int NOT NULL,
   min_night int NOT NULL,
   max_night int NOT NULL,
   rating FLOAT NOT NULL,
   num_reviews int NOT NULL
);

CREATE TABLE booking ( 
  id int PRIMARY KEY, 
  email text NOT NULL, 
  guest_adult int NOT NULL, 
  guest_child int NOT NULL, 
  guest_infant int NOT NULL, 
  check_in date NOT NULL,
  check_out date NOT NULL,
  roomid int REFERENCES rooms(id));