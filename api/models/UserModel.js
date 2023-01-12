const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'What is your email?'],
    unique: [true, 'Email already exist!'],
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
});

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
