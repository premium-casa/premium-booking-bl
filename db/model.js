/* eslint-disable camelcase */
/* eslint-disable no-console */
const { Pool } = require('pg');

const pool = new Pool({
  user: 'brianlagman',
  host: 'localhost',
  database: 'bookings',
  password: 'password',
  port: 5432,
});

pool.connect();
pool.query('SELECT NOW()')
  .then(() => console.log('Successfully Connected to Postgres Database'))
  .catch(err => console.log(err));

// const getRoom = (req, res) => {
//   const { id } = req.query;
//   pool.query(`SELECT * FROM booking WHERE roomid=${id}`)
//     .then((data) => {
//       console.log(data.rows);
//       res.status(200);
//       res.send(data.rows);
//     });
// };

const getRoom = (req, res) => {
  const { id } = req.query;
  pool.query(`SELECT * FROM booking INNER JOIN rooms ON rooms.id = booking.roomid WHERE rooms.id=${id}`)
    .then((data) => {
      // console.log(data.rows[0]);
      let {
        id, roomname, price, cleaning_fee, service_fee, tax, max_adults, max_child, max_infants, min_night, max_night, rating, num_reviews,
      } = data.rows[0];
      
      const mainRoom = {
        id, roomname, price, cleaning_fee, service_fee, tax, max_adults, max_child, max_infants, min_night, max_night, rating, num_reviews,
      };
      
      const arrBook = [];
      for (let i = 0; i < data.rows.length; i += 1) {
        const {
          email, guest_adult, guest_child, guest_infant, check_in, check_out, roomid,
        } = data.rows[i];
        const obj = {
          email,
          guest_adult,
          guest_child,
          guest_infant,
          check_in,
          check_out,
          roomid,
        };
        arrBook.push(obj);
      }
      const result = [mainRoom, arrBook];
      res.status(200);
      res.send(result);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

const postBooking = (req, res) => {
  const {
    id, email, guest_adult, guest_child, guest_infant, check_in, check_out, roomid,
  } = req.body;


  pool.query(`SELECT * FROM booking WHERE roomid=${roomid} AND (check_in, check_out) OVERLAPS ('${check_in}'::DATE, '${check_out}'::DATE);`)
    .then((data) => {
      console.log(data.rows.length);
      if (data.rows.length === 0) {
        console.log('available');
        pool.query(`INSERT INTO booking (id,email,guest_adult,guest_child,guest_infant,check_in,check_out, roomid) VALUES (${id},'${email}',${guest_adult},${guest_child},${guest_infant},'${check_in}','${check_out}',${roomid});`)
          .then(() => {
            res.status(202);
            res.send('Successful Post');
          })
          .catch(() => {
            res.sendStatus(500);
          });
      }
      res.send('Dates not available');
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

const updateBooking = (req, res) => {
  const {
    check_in, check_out, roomid, email,
  } = req.body;

  pool.query(`UPDATE booking SET check_in='${check_in}', check_out='${check_out}' WHERE roomid=${roomid} and email='${email}';`)
    .then(() => {
      res.status(200);
      res.send('Updated');
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

const deleteBooking = (req, res) => {
  const { email, roomid } = req.body;
  pool.query(`DELETE FROM booking WHERE email='${email}' and roomid=${roomid};`)
    .then(() => {
      res.status(200);
      res.send(`Removed ${email} from room ${roomid}`);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

module.exports = {
  getRoom,
  postBooking,
  updateBooking,
  deleteBooking,
};
