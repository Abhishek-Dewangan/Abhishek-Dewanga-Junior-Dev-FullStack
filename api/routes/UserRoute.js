const {Router} = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const isUnique = await User.findOne({email: req.body.email});
    isUnique && res.status(409).send({message: 'Email is already registered'});
    const user = await new User(req.body).save();
    res.status(200).send({message: `${user.name} registered successfully`});
  } catch (error) {
    res.status(401).send({message: 'Error while signup', error});
  }
});

userRouter.post('/signin', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await user.generateAuthToken();
        res
          .status(201)
          .send({message: 'User login successfully', token, userid: user._id});
      } else {
        res.status(401).send({message: 'Wrong Password Entered'});
      }
    } else res.status(404).send({message: 'Email is not registered'});
  } catch (error) {
    res.status(401).send({message: 'Error while signin', error});
  }
});

userRouter.post('/logout', async (req, res) => {
  try {
    const {token} = req.headers;
    const user = await User.findOne({token: token});
    if (user) {
      user.token = '';
      await user.save();
      res.status(200).send({message: 'Logout successfully'});
    } else {
      res.status(498).send({message: 'Invalid token'});
    }
  } catch (error) {
    res.status(401).send({message: 'Error while logout', error});
  }
});

module.exports = userRouter;
