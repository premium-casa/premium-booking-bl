'use strict';

// Make sure to "npm install faker" first.
const moment = require('moment');
const Faker = require('faker');

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const checkin = () => {
  return moment().add(randomNum(3, 10), 'days').format('YYYY-MM-DD');
};

const checkout = () => {
  return moment().add(randomNum(13, 19), 'days').format('YYYY-MM-DD');
};
const randomPop = () => {
  const arr = [randomNum(10, 20), randomNum(0, 10000000), randomNum(0, 10000000), randomNum(0, 10000000)];
  return arr[randomNum(0, 3)];
};

function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  const id = randomNum(1, 10000000);
  const email = Faker.internet.exampleEmail();
  const guest_adult = randomNum(1, 4);
  const guest_child = randomNum(0, 3);
  const guest_infant = randomNum(0, 2);
  const check_in = checkin();
  const check_out = checkout();
  const roomid = randomNum(1, 10000000);
  const randomId = randomPop();
  // add variables to virtual user's context:
  
  userContext.vars.randomId = randomPop;
  userContext.vars.id = id;
  userContext.vars.email = email;
  userContext.vars.guest_adult = guest_adult;
  userContext.vars.guest_child = guest_child;
  userContext.vars.guest_infant = guest_infant;
  userContext.vars.check_in = check_in;
  userContext.vars.check_out = check_out;
  userContext.vars.roomid = roomid;
  // continue with executing the scenario:
  return done();
}

module.exports = {
  generateRandomData,
};
