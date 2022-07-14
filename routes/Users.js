const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', async (req, res) => {
  if (await User.findOne({ email: req.body.email }))
    return res.status(400).send('User already registered.');

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(user.password, salt);
  user.password = hashed;

  await user.save();

  const token = user.generateAuthToken();
  return res
    .header('x-auth-token', token)
    .send({ _id: user._id, name: user.name, email: user.email });
});

module.exports = router;
