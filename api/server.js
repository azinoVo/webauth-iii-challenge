const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send("Server Works!");
});


server.post('/', (req, res) => {
  
});


// Middleware

function nameHere (req, res, next) {

};



module.exports = server;
