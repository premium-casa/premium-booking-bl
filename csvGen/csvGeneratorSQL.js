/* eslint-disable no-var */
/* eslint-disable no-redeclare */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable prefer-template */
const fs = require('fs');
const moment = require('moment');

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const roomNameAppendix = ['\'s Apartment', '\'s House', '\'s Loft', '\'s Condo'];
const name = ['tom gay', 'sam hank', 'bill yee', 'liz harry', 'ashley nguyen', 'michael scott', 'pam beesly'];
const email = ['tom@gmail', 'sam@yahoo.com', 'bill@aol.com', 'liz@hotmail.com', 'ashley@gmail.com', 'michael@yahoo.com', 'pam@gmail.com'];
const day = 86400000;

const dateFormat = (date) => {
  var date = new Date(date);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const days = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${days}`;
};

const wstream1 = fs.createWriteStream('testroomdata.csv');
const wstream2 = fs.createWriteStream('bookingdata1.csv');

async function dataGenerator() {
  wstream1.write('id,roomname,price,cleaning_fee,service_fee,tax,max_adults,max_child,max_infants,min_night,max_night,rating,num_reviews\n');
  wstream2.write('id,email,guest_adults,guest_child,guest_infant,check_in,check_out,roomid\n');

  for (let i = 1; i <= 10000000; i += 1) {
    let startDate = moment().toDate().getTime();
    const writeRoom = wstream1.write(
      i + ',' +
      name[randomNum(0, name.length - 1)] + ' ' + roomNameAppendix[randomNum(0, roomNameAppendix.length - 1)] + ', ' +
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
      randomNum(0, 100) + '\n'
    );
    for (let j = 1; j <= randomNum(6, 9); j += 1) {
      const chkIn = startDate + (day * randomNum(1, 5));
      const chkOut = chkIn + (day * randomNum(2, 5));
      const writeBook = wstream2.write(
        j + ',' +
        email[randomNum(0, email.length - 1)] + ',' +
        randomNum(1, 3) + ', ' +
        randomNum(0, 2) + ',  ' +
        randomNum(0, 1) + ', ' +
        dateFormat(chkIn) + ', ' +
        dateFormat(chkOut) + ', ' +
        i + '\n',
      );
      const gap = (day * randomNum(4, 7));
      startDate = chkOut + gap;
      if (!writeBook) {
        await new Promise((resolve) => {
          wstream2.once('drain', resolve);
        });
      }
    }
    if (!writeRoom) {
      await new Promise((resolve) => {
        wstream1.once('drain', resolve);
      });
    }
    if (i % 100000 === 0) {
      console.log(i);
    }
  }
  wstream1.end();
  console.log('Rooms All Seeded!');

  wstream2.end();
  console.log('Bookings All Seeded!');
}

dataGenerator();
