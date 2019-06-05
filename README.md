# Airbnb-booking

> Airbnb Booking module

## Related Projects

  - https://github.com/hacker-home/Airbnb-more-homes
  - https://github.com/hacker-home/Airbnb-info
  - https://github.com/hacker-home/Airbnb-reviews
  - https://github.com/hacker-home/Airbnb-photos

My proxy server is here!

https://github.com/hacker-home/Airbnb-booking-proxy

## Usage

> API CRUD Routes and information

### Rooms
| API Endpoints  | Request Type | Input | Output | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| /room/:roomId | GET | Room ID  | Room listing  | Get the room listing features for a specifc ID |
| /room/:roomId | POST          | Specific features for room listing. Refer to rooms schema | STATUS CODE 201  | Create a Room Listing | 
| /room/:roomId | PATCH         | Room ID  | STATUS CODE 200  | Update a Room Listing  |
| /room/:roomId | DELETE        | Room ID  | STATUS CODE 200  | Delete a Room Listing |

### Bookings
| API Endpoints  | Request Type | Input | Output | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| /booking/:bookingId | GET           | Booking ID  | Booking listing  | Get the booking listing features for a specifc ID |
| /booking/:bookingId | POST          | Specific features for book listing. Refer to bookings schema | STATUS CODE 201  | Create a Book Listing  | 
| /booking/:bookingId | PATCH         | Booking ID  | STATUS CODE 200  | Update a Book Listing  |
| /booking/:bookingId | DELETE        | Booking ID  | STATUS CODE 200  | Delete a Book Listing |



> This module is a booking portal on Airbnb listing page

If you have any questions or feedbacks, please feel free to contact me!

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- MySQL
- Webpack
- React


## Deploying

This module is using docker-compose for deployment.

You should check the './db/index.js' file before deploy(change the host)!

And don't forget to build 'bundle.js' with webpack on production mode using command below.
```sh
npm run build
```

In './booking' directory, there is a dockerFile for building image of database

When you try to deploy, run 
```sh
docker-compose up
```
from the root directory, and push those images to your docker hub.

In your instance, make another docker-compose.yml file with vim.
```sh
vim docker-compose.yml
```

Copy this docker-compose.yml file and change 'build' script to 'image' and change directory to the name of the images.


### Installing Dependencies

From within the root directory:

```sh
// before you run any files, please run this script
npm install


// to run the server (using nodemon)
npm start

// build bundle.js on production mode
npm run build

// build bundle.js on development mode and watching
npm react-dev

// create database and seed
npm run seed
```

