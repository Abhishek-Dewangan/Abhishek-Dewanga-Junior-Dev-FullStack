const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'What is your name?'],
  },
  email: {
    type: String,
    required: [true, 'What is your email?'],
    unique: [true, 'Email already exist'],
    lowercase: true,
    trim: true,
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

UserSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is missing, can not compare!');
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error while comparing the password', error);
  }
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
