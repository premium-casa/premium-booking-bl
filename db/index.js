const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking', 'postgres', 'password', {
  host: 'ec2-52-53-177-193.us-west-1.compute.amazonaws.com',
  dialect: 'mysql',
});


const Room = sequelize.define('rooms', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  roomname: Sequelize.STRING,
  price: Sequelize.INTEGER,
  cleaning_fee: Sequelize.INTEGER,
  service_fee: Sequelize.INTEGER,
  tax: Sequelize.INTEGER,
  max_adults: Sequelize.INTEGER,
  max_child: Sequelize.INTEGER,
  max_infant: Sequelize.INTEGER,
  min_night: Sequelize.INTEGER,
  max_night: Sequelize.INTEGER,
  ratings: Sequelize.DECIMAL(2, 1),
  num_reviews: Sequelize.INTEGER,
});

const Booking = sequelize.define('bookings', {
  email: Sequelize.STRING,
  guest_adults: Sequelize.INTEGER,
  guest_child: Sequelize.INTEGER,
  guest_infant: Sequelize.INTEGER,
  check_in: Sequelize.DATE,
  check_out: Sequelize.DATE,
  roomId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'rooms',
      key: 'id',
    },
  },
});

Room.hasMany(Booking, { foreignKey: 'roomId' });
Booking.belongsTo(Room, { foreignKey: 'roomId' });

sequelize.authenticate();

Room.sync();
Booking.sync();

module.exports = {
  Room,
  Booking,
};
