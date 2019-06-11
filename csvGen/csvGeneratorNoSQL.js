/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const moment = require('moment');

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const roomNameAppendix = ['s Apartment', 's House', 's Loft', 's Condo'];
const name = ['tom gay', 'sam hank', 'bill yee', 'liz harry', 'ashley nguyen', 'michael scott', 'pam beesly'];

const randomName = () => `${name[randomNum(0, name.length - 1)]}${roomNameAppendix[randomNum(0, roomNameAppendix.length - 1)]}`;

const randomRating = () => (Math.random() * (5.0 - 1.0) + 1.0).toFixed(1);

const wstream1 = fs.createWriteStream('testnoSQLBookingData.csv');

const bookGenerator = (counter) => {
  const email = ['tom@gmail', 'sam@yahoo.com', 'bill@aol.com', 'liz@hotmail.com', 'ashley@gmail.com', 'michael@yahoo.com', 'pam@gmail.com'];
  const day = 86400000;
  let startDate = moment().toDate().getTime();
  const newObj = {};

  const num = randomNum(5, 8);
  for (let j = 1; j <= num; j += 1) {
    const chkIn = startDate + (day * randomNum(0, 5));
    const chkOut = chkIn + (day * randomNum(2, 5));

    const obj = {
      email: `${email[randomNum(0, email.length - 1)]}`,
      gueset_adults: `${randomNum(1, 3)}`,
      guest_child: `${randomNum(1, 3)}`,
      guest_infant: `${randomNum(1, 3)}`,
      check_out: `${new Date(chkOut)}`,
      roomid: `${counter}`,
    };

    const gap = (day * randomNum(2, 4));
    startDate = chkOut + gap;

    newObj[`${new Date(chkIn)}`] = obj;
  }

  const string = JSON.stringify(newObj).split('"').join('');
  return string;
};

async function dataGenerator() {
  wstream1.write('id|roomname|price|cleaning_fee|service_fee|tax|max_adults|max_child|max_infants|min_night|max_night|rating|num_reviews|bookings\n');

  for (let i = 1; i <= 1; i += 1) {
    const writeRoom = wstream1.write(
      `${i}|${randomName()}|${randomNum(50, 200)}|${5}|${5}|${10}|${randomNum(1, 6)}|${randomNum(0, 4)}|${randomNum(0, 2)}|${randomNum(50, 100)}|${randomNum(100, 500)}|${randomRating()}|${randomNum(0, 100)}| ${(bookGenerator(i))}\n`
    );
    if (i % 100000 === 0) {
      console.log(i);
    }
    if (!writeRoom) {
      await new Promise((resolve) => {
        wstream1.once('drain', resolve);
      });
    }
  }

  wstream1.end();
  console.log('Successfull Seed!');
}

dataGenerator();
