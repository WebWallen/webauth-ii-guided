const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const sessionConfig = {
  name: 'ohfosho', // default would be SID (change so people don't know what library you're using)
  secret: 'Keep it secret, keep it safe!', 
  cookie: {
    httpOnly: false, // means JS can't allow cookie info
    maxAge: 1000 * 60 * 60, // cookie is good for one hour (converted to MS)
    secure: false, // true in production, false in development
  },
  resave: false, // to avoid rechurning
  saveUninitialized: false,
}

const server = express();

server.use(sessions(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
