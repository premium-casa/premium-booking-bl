/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const {
  randomNum,
  roomNameAppendix,
  name,
  email,
} = require('./helpers.js');

const { calendar } = require('./calendar.js');

const wstream1 = fs.createWriteStream('./csvGen/roomdata2.csv');
const wstream2 = fs.createWriteStream('./csvGen/bookingdata2.csv');
const wstream3 = fs.createWriteStream('./csvGen/test2calendardata.csv');

const dataGenerator = async () => {
  console.log('Start');
  wstream1.write('id|roomname|price|cleaning_fee|service_fee|tax|max_adult|max_child|max_infant|min_night|max_night|rating|num_reviews\n');

  wstream2.write('id|email|guest_adult|guest_child|guest_infants|roomid\n');

  wstream3.write('id|day|bookid|roomid\n');

  let counter = 0;
  let calCount = 0;
  for (let i = 3000001; i <= 6000000; i += 1) {
    const writeRoom = wstream1.write(
      `${i}|${name[randomNum(0, name.length - 1)]} ${roomNameAppendix[randomNum(0, roomNameAppendix.length - 1)]}|${randomNum(50, 200)}|${5}|${5}|${10}|${randomNum(1, 6)}|${randomNum(0, 4)}|${randomNum(0, 2)}|${randomNum(50, 100)}|${randomNum(100, 500)}|${(Math.random() * (5.0 - 1.0) + 1.0).toFixed(1)}|${randomNum(0, 100)}\n`,
    );

    for (let j = 1; j <= 5; j += 1) {
      counter += 1;
      const writeBook = wstream2.write(
        `${counter}|${email[randomNum(0, email.length - 1)]}|${randomNum(1, 3)}|${randomNum(0, 2)}|${randomNum(0, 1)}|${i}\n`,
      );
      if (!writeBook) {
        await new Promise((resolve) => {
          wstream2.once('drain', resolve);
        });
      }
    }

    for (let k = 0; k < calendar.length; k += 1) {
      calCount += 1;
      const date = calendar[k];
      const writeCal = wstream3.write(
        `${calCount}|${date}|${randomNum(1, 50000000)}|${i}\n`,
      );

      if (!writeCal) {
        await new Promise((resolve) => {
          wstream3.once('drain', resolve);
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
  wstream2.end();
  wstream3.end();
  console.log('SUCCESSFUL CSV GENERATED');
};

dataGenerator();
