----------------------------- POSTGRES SCHEMA ------------------------------------------------------------------
CREATE TABLE rooms ( id int PRIMARY KEY,roomname text,price int,cleaning_fee int,service_fee int,tax int,max_adult int,max_child int,max_infant int,min_night int,max_night int,rating FLOAT,num_reviews int);

INSERT INTO rooms(id, roomname,price,cleaning_fee,service_fee,tax,max_adult,max_child,max_infant,min_night,max_night,rating,num_reviews) VALUES (1,'brians room',5,5,5,5,5,5,5,5,5,5.3,5 );

CREATE TABLE booking ( id int PRIMARY KEY, email text NOT NULL, guest_adult int NOT NULL, guest_child int NOT NULL, guest_infant int NOT NULL, check_in date NOT NULL, check_out date NOT NULL, roomid int REFERENCES rooms(id));

INSERT INTO booking (id,email, guest_adult,guest_child,guest_infant, check_in, check_out, roomid) VALUES(1,'brian@gmail.com',3,3,3,'2018-09-09', '2019-09-09',1);

CREATE TABLE calendar ( id SERIAL PRIMARY KEY, day date NOT NULL, bookid int REFERENCES booking(id), roomid int REFERENCES rooms(id));

INSERT INTO calendar(day, available, bookid, roomid) VALUES('2001-04-03','f',null,1);

-- COPY

copy rooms from '/Users/brianlagman/Projects/premium-casa/premium-booking-bl/csvGen/roomdata2.csv' delimiter '|' csv header;

copy booking from '/Users/brianlagman/Projects/premium-casa/premium-booking-bl/csvGen/bookingdata2.csv' delimiter '|' csv header;

copy calendar from '/Users/brianlagman/Projects/premium-casa/premium-booking-bl/csvGen/calendardata2.csv' delimiter '|' csv header;


-- POST
insert into rooms(id, roomname,price,cleaning_fee,service_fee, tax, max_adults,max_child,max_infants,min_night,max_night,rating,num_reviews) values (10000002,'brian', 2,2,2,2,2,2,2,2,2,2,2);

insert into bookings (email, guest_adults, guest_child, guest_infant, check_in,check_out, roomid) values ('fda', 2,2,2,'3','5', 3);

-- UPDATE
update bookings set check_in='new'  where roomid=5000000;

-- DELETE

delete from bookings where roomid=5000000;

delete from bookings where roomid=10000000;


------------------------------- CASSANDRA SCHEMA ------------------------------------------------------------------

CREATE KEYSPACE bookings WITH replication = { 'class':'SimpleStrategy’, ‘replication_factor' : 1 };

CREATE TABLE rooms (id uuid PRIMARY KEY,roomname varchar,price number,cleaning_fee number,service_fee number,tax number,max_adult number,max_child number, max_infant number,min_night number,max_night number,rating number,num_reviews number, set<FROZEN<text>: <book>>);

INSERT INTO rooms (id,roomname,price,cleaning_fee,service_fee,tax,max_adult,max_child, max_infant,min_night,max_night,rating,num_reviews,booking) VALUES(10000001, 'brians room',500,5,5,10,3,2,1,50,200,5.7,25,'dd');

INSERT INTO rooms (id,roomname,price,cleaning_fee,service_fee,tax,max_adults,max_child, max_infants,min_night,max_night,rating,num_reviews,bookings) VALUES(10000001, 'brians room',500,5,5,10,3,2,1,50,200,5.7,25,'dd');

CREATE type book (id, email varchar, guest_adult number, guest_child number, guest_infants number, check_in date, check_out date);

INSERT INTO book(id, email varchar, guest_adult number, guest_child number, guest_infants number, check_in date, check_out date) VALUES ()

CAPTURE '/Users/brianlagman/Projects/premium-casa/premium-booking-bl/csvGen/noSQLrooms.csv'
CAPTURE '/Users/brianlagman/Projects/premium-casa/premium-booking-bl/csvGen/noSQLbooks.csv'

COPY bookings.room (id,roomname,price,cleaning_fee,service_fee,tax,max_adult,max_child, max_infant,min_night,max_night,rating,num_reviews) from '/Users/brianlagman/Projects/premium-casa/premium-booking-bl/csvGen/noSQLrooms.csv' WITH header=true and delimiter='|';



