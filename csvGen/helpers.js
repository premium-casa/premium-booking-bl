/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
const moment = require('moment');
const { calendar } = require('./calendar.js');

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const roomNameAppendix = ['\'s Apartment', '\'s House', '\'s Loft', '\'s Condo'];

const name = ['tom gay', 'sam hank', 'bill yee', 'liz harry', 'ashley nguyen', 'michael scott', 'pam beesly'];

const email = ['tom@gmail', 'sam@yahoo.com', 'bill@aol.com', 'liz@hotmail.com', 'ashley@gmail.com', 'michael@yahoo.com', 'pam@gmail.com'];

const dateGen = (num) => {
  const year = moment().startOf('year').format('YYYY-MM-DD');
  if (num > 1) {
    const addDay = moment().startOf('year').add(num - 1, 'days').format('YYYY-MM-DD');
    return addDay;
  } else {
    return year;
  }
};

const bookings = (date) => {
  if (calendar[date] === 'f') {
    return `|${calendar[date]}|${randomNum(1, 50)}`;
  } else {
    return calendar[date];
  }
};

module.exports = {
  randomNum,
  roomNameAppendix,
  name,
  email,
  dateGen,
  bookings,
};
