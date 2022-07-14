const helmet = require('helmet');
const compression = require('compression');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const listings = require('./routes/Listings');
const users = require('./routes/Users');
const auth = require('./routes/Auth');

if (!config.get('jwtPrivatekey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

const app = express();

mongoose
  .connect(config.get('db'))
  .then(() => console.log('Connected to MongoDB..'))
  .catch(() => console.log('Error Concreting to MongoDB..'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use('/api/listings', listings);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(helmet());
app.use(compression());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}..`));
