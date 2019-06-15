require('newrelic');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const responseTime = require('response-time');
const db = require('../db/model.js');

const app = express();
const port = 3333;

app.use(responseTime());

app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(bodyParser.json());
app.use(cors());

app.get('/room', db.getRoom);
app.get('/booking', db.getBooking);
app.post('/booking', db.postBooking);
app.put('/booking', db.updateBooking);
app.delete('/booking', db.deleteBooking);

app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});

// NODE CLUSTERING WHICH DROPS THE RPS
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);
//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
//   // Workers can share any TCP connection
//   // In this case it is an HTTP server
//   app.get('/room', db.getRoom);
//   app.get('/booking', db.getBooking);
//   app.post('/booking', db.postBooking);
//   app.put('/booking', db.updateBooking);
//   app.delete('/booking', db.deleteBooking);

//   app.listen(port, () => {
//     console.log(`Worker ${process.pid} started`);
//     // console.log(`Listening port: ${port}`);
//   });
// }
