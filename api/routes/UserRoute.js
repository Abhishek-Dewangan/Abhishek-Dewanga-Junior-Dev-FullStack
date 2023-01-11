const {Router} = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const user = await new User(req.body).save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.post('/signin', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
      const result = await user.comparePassword(password);
      if (result) res.status(201).send('Login success', result);
      res.status(400).send('Wrong Password Entered', result);
    }
    res.status(404).send('Email is not registere');
  } catch (error) {
    res.status(400).send(error);
  }
});
