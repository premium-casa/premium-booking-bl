/* eslint-disable quote-props */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'ec2-52-53-177-193.us-west-1.compute.amazonaws.com',
  database: 'bookings',
  password: 'password',
  port: 5432,
});

pool.connect();
pool.query('SELECT NOW()')
  .then(() => console.log('Successfully Connected to Postgres Database'))
  .catch(err => console.log(err));

const redis = require('redis');

const client = redis.createClient();

// Print redis errors to the console
client.on('error', (err) => {
  console.log(`Error${err}`);
});

const getRoom = (req, res) => {
  const { id } = req.query;
  // GET FROM REDIS
  return client.hgetall(`${id}`, (err, result) => {
    if (result) {
      const obj = {
        price: Number(result.price),
        cleaning_fee: Number(result.cleaning_fee),
        service_fee: Number(result.service_fee),
        tax: Number(result.tax),
        max_adults: Number(result.max_adults),
        max_child: Number(result.max_child),
        max_infants: Number(result.max_infants),
        min_night: Number(result.min_night),
        max_night: Number(result.max_night),
        rating: Number(result.rating),
        num_reviews: Number(result.num_reviews),
      };
      res.status(200);
      res.send([obj]);
    } else {
      // GET FROM DB
      pool.query(`SELECT * FROM rooms WHERE id=${id}`, (error, data) => {
        console.log(data)
        if (error) {
          res.sendStatus(404);
        } else {
          client.hmset(`${id}`,
            'roomname', `${data.rows[0].roomname}`,
            'price', data.rows[0].price,
            'cleaning_fee', data.rows[0].cleaning_fee,
            'service_fee', data.rows[0].service_fee,
            'tax', data.rows[0].tax,
            'max_adults', data.rows[0].max_adults,
            'max_child', data.rows[0].max_child,
            'max_infants', data.rows[0].max_infants,
            'min_night', data.rows[0].min_night,
            'max_night', data.rows[0].max_night,
            'rating', data.rows[0].rating,
            'num_reviews', data.rows[0].num_reviews);
          res.status(200);
          res.send(data.rows);
        }
      });
    }
  });
};

const getBooking = (req, res) => {
  const { id } = req.query;
  // GET FROM REDIS
  return client.get(`${id}`, (err, result) => {
    if (result) {
      res.status(200);
      res.send(result);
    } else {
      // GET FROM DB
      pool.query(`SELECT check_in,check_out FROM booking WHERE roomid=${id}`, (error, data) => {
        if (error) {
          res.sendStatus(404);
        } else {
          const dataString = JSON.stringify(data.rows);
          client.set(`${id}`, dataString);
          res.status(200);
          res.send(data.rows);
        }
      });
    }
  });
};

const postBooking = (req, res) => {
  const {
    id, email, guest_adult, guest_child, guest_infant, check_in, check_out, roomid,
  } = req.body;

  pool.query(`SELECT * FROM booking WHERE roomid=${roomid} AND (check_in, check_out) OVERLAPS ('${check_in}'::DATE, '${check_out}'::DATE);`)
    .then((data) => {
      if (data.rows.length === 0) {
        pool.query(`INSERT INTO booking (id,email,guest_adult,guest_child,guest_infant,check_in,check_out, roomid) VALUES (${id},'${email}',${guest_adult},${guest_child},${guest_infant},'${check_in}','${check_out}',${roomid});`)
          .then(() => {
            res.status(202);
            res.send('Successful Post');
          })
          .catch(() => {
            res.sendStatus(500);
          });
      } else {
        res.status(202);
        res.send('Dates not available');
      }
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
  getBooking,
  postBooking,
  updateBooking,
  deleteBooking,
};


// const getBooking = (req, res) => {
//   const { id } = req.query;
//   pool.query(`SELECT check_in,check_out FROM booking WHERE roomid=${id}`)
//     .then((data) => {
//       console.log(data.rows)
//       res.status(200);
//       res.send(data.rows);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };

// const getRoom = (req, res) => {
//   const { id } = req.query;
//   pool.query(`SELECT * FROM booking INNER JOIN rooms ON rooms.id = booking.roomid WHERE rooms.id=${id}`)
//     .then((data) => {
//       // console.log(data.rows[0]);
//       let {
//         id, roomname, price, cleaning_fee, service_fee, tax, max_adults, max_child, max_infants, min_night, max_night, rating, num_reviews,
//       } = data.rows[0];
      
//       const mainRoom = {
//         id, roomname, price, cleaning_fee, service_fee, tax, max_adults, max_child, max_infants, min_night, max_night, rating, num_reviews,
//       };
      
//       const arrBook = [];
//       for (let i = 0; i < data.rows.length; i += 1) {
//         const {
//           email, guest_adult, guest_child, guest_infant, check_in, check_out, roomid,
//         } = data.rows[i];
//         const obj = {
//           email,
//           guest_adult,
//           guest_child,
//           guest_infant,
//           check_in,
//           check_out,
//           roomid,
//         };
//         arrBook.push(obj);
//       }
//       const result = [mainRoom, arrBook];
//       res.status(200);
//       res.send(result);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };