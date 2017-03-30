const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('./config.js');

const options = { promiseLibrary: Promise };
const db = mongoose.connect(config.localDBurl, options);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${config.localDBurl}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = db;
