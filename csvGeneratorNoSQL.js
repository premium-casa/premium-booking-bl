/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable prefer-template */
const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const roomNameAppendix = ['\'s Apartment', '\'s House', '\'s Loft', '\'s Condo'];
const day = 86400000;


const wstream1 = fs.createWriteStream('noSQLBookingData.csv');

wstream1.write('id,roomname,price,cleaning_fee,service_fee,tax,max_adults,max_child,max_infants,min_night,max_night,rating,num_reviews,bookings\n');

for (let i = 1; i <= 1; i += 1) {
  wstream1.write(
    i + ',' +
    faker.name.findName() + ' ' + roomNameAppendix[randomNum(0, roomNameAppendix.length - 1)] + ', ' +
    randomNum(50, 200) + ', ' +
    5 + ', ' +
    5 + ', ' +
    10 + ', ' +
    randomNum(1, 6) + ', ' +
    randomNum(0, 4) + ', ' +
    randomNum(0, 2) + ', ' +
    randomNum(50, 100) + ', ' +
    randomNum(100, 500) + ', ' +
    (Math.random() * (5.0 - 1.0) + 1.0).toFixed(1) + ', ' +
    randomNum(0, 100) + ',"{'
  );
  let startDate = moment().toDate().getTime();
  let num = randomNum(5, 10);
  for (let j = 1; j <= num; j += 1) {
    const chkIn = startDate + (day * randomNum(0, 5));
    const chkOut = chkIn + (day * randomNum(2, 5));
    wstream1.write(
      "{email:'" + faker.internet.email() + "', " +
        "guest_adults:" + randomNum(1, 3) + ", " +
        "guest_child:" + randomNum(0, 2) + ", " +
        "guest_infant:" + randomNum(0, 1) + ", " +
        "check_in:'" + new Date(chkIn) + "', " +
        "check_out:'" + new Date(chkOut) + "', "
    );
    if (j === num) {
      wstream1.write('roomid: ' + i + '}');
    } else {
      wstream1.write('roomid: ' + i + '}, ');
    }
    const gap = (day * randomNum(2, 4));
    startDate = chkOut + gap;
  }
  wstream1.write('}"\n');
  if (i % 100000 === 0) {
    console.log(i);
  }
}
wstream1.end();
console.log('Successfull Seed!');
