const {Router} = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const user = await new User(req.body).save();
    res
      .status(200)
      .send({message: `${user.name} registered successfully`, user});
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.post('/signin', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    console.log(user);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await user.generateAuthToken();
        console.log(user);
        res.status(201).send({message: 'User login successfully', token, user});
      } else {
        res.status(400).send({message: 'Wrong Password Entered'});
      }
    } else res.status(404).send({message: 'Email is not registere'});
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.post('/logout', async (req, res) => {
  try {
    const {token} = req.headers;
    const user = await User.findOne({token: token});
    console.log(user);
    if (user) {
      user.token = '';
      await user.save();
      console.log(user);
      res.status(200).send({message: 'Logout successfully'});
    } else {
      res.status(400).send({message: 'Invalid token'});
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = userRouter;
