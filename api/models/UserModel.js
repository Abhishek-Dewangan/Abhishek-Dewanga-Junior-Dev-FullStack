const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'What is your email?'],
    unique: [true, 'Email already exist!'],
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('Invalid email');
    },
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'What is your name?'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password must be filled'],
    minlength: [8, 'Minimum length of password should be 8'],
    trim: true,
  },
  token: String,
});

// Password Hashing
UserSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Generating token
UserSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    this.token = token;
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
