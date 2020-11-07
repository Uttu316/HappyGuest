const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserDetails = mongoose.model('UserDetails');

router.post('/edit/user', async (req, res) => {
  try {
    await UserDetails.findOneAndUpdate(
      {userId: req.body.userId},
      req.body,
      {new: true},
      (err, doc) => {
        if (!err) {
          res.send({
            success: true,
            data: {
              message: 'Data saved successfully',
            },
          });
        } else {
          return res
            .status(422)
            .send({success: false, data: {message: err.message}});
        }
      },
    );
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/edit/password', async (req, res) => {
  const userData = req.body;
  const current_password = userData.current_password;
  const new_password = userData.new_password;

  const user = await UserDetails.findOne({
    userId: userData.userId,
  });
  if (!user) {
    return res.status(422).send({error: 'user not found!'});
  }

  await user
    .comparePassword(current_password)
    .then(isMatched => {
      bcrypt.hash(new_password, 10, async (err, hash) => {
        if (err) {
          return;
        }
        const new_hash_password = hash;
        try {
          await UserDetails.findOneAndUpdate(
            {userId: req.body.userId},
            {password: new_hash_password},
            {new: true},
            (error, doc) => {
              if (!error) {
                res.send({
                  success: true,
                  data: {
                    message: 'Data saved successfully',
                    password: new_hash_password,
                  },
                });
              } else {
                return res
                  .status(422)
                  .send({success: false, data: {message: error.message}});
              }
            },
          );
        } catch (err) {
          return res.status(422).send({error: err.message});
        }
      });
    })
    .catch(err => {
      return res.send({
        success: false,
        data: {message: 'current password is not correct'},
      });
    });
});
module.exports = router;
