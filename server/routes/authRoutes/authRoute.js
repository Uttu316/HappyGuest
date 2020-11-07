const express = require('express');
const mongoose = require('mongoose');
const {v1: uuidv1} = require('uuid');
const jwt = require('jsonwebtoken');
const {jwtkey} = require('../../keys');
const router = express.Router();
const UserDetails = mongoose.model('UserDetails');

router.post('/signup', async (req, res) => {
  const {email, password, phone, user_name} = req.body;
  const userId = uuidv1();
  try {
    const user = new UserDetails({
      userId,
      email,
      password,
      phone,
      user_name,
      dob: '',
      gender: 'notspecified',
      current_address: '',
      permanent_address: '',
      profile_picture: '',
      bio: '',
      company: '',
    });
    const isAlreadyPresent = await UserDetails.findOne({
      $or: [{email: email}, {phone: email}],
    });
    if (!isAlreadyPresent) await user.save();
    else return res.status(422).send('already signed up');
    const token = jwt.sign({userId: user.userId}, jwtkey);
    res.send({token});
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(422).send({error: 'must provide email or password'});
  }
  const user = await UserDetails.findOne({
    $or: [{email: email}, {phone: email}],
  });

  if (!user) {
    return res.status(422).send({error: 'must provide email or password'});
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({userId: user.userId}, jwtkey);
    res.send({token, user});
  } catch (err) {
    return res.status(422).send({error: 'must provide email or password'});
  }
});
module.exports = router;
