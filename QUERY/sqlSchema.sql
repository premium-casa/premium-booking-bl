----------------------------- POSTGRES SCHEMA ------------------------------------------------------------------
CREATE TABLE rooms ( id SERIAL PRIMARY KEY,roomname text NOT NULL,price int NOT NULL,cleaning_fee int NOT NULL,service_fee int NOT NULL,tax int NOT NULL,max_adult int NOT NULL,max_child int NOT NULL,max_infant int NOT NULL,min_night int NOT NULL,max_night int NOT NULL,rating FLOAT NOT NULL,num_reviews int NOT NULL);

INSERT INTO rooms(roomname,price,cleaning_fee,service_fee,tax,max_adult,max_child,max_infant,min_night,max_night,rating,num_reviews) VALUES ('brians room',5,5,5,5,5,5,5,5,5,5.3,5 );

CREATE TABLE booking ( id SERIAL PRIMARY KEY, email text NOT NULL, guest_adult int NOT NULL, guest_child int NOT NULL, guest_infants int NOT NULL, roomid int REFERENCES rooms(id));

INSERT INTO booking (email,guest_adult,guest_child,guest_infants,roomid) VALUES('brian@gmail.com',3,3,3,1);

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



