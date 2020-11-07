const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userDetailsSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  current_address: {
    type: String,
  },
  permanent_address: {
    type: String,
  },
  bio: {
    type: String,
  },
  company: {
    type: String,
  },
  profile_picture: {
    type: String,
  },
  user_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
});

userDetailsSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

userDetailsSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(err);
      }
      resolve(true);
    });
  });
};
mongoose.model('UserDetails', userDetailsSchema);
