const {Router} = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const isUnique = await User.findOne({email: req.body.email});
    if (isUnique) {
      res.status(409).send({message: 'Email is already registered'});
    } else {
      const user = await new User(req.body).save();
      res.status(200).send({message: `${user.name} registered successfully`});
    }
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
        res.status(201).send({
          message: 'User login successfully',
          token,
          username: user.name,
          userid: user._id,
        });
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

userRouter.post('/addtask', async (req, res) => {
  try {
    const {userid, task} = req.body;
    const user = await User.findOne({_id: userid});
    if (user) {
      if (user.task.length < 5) {
        user.task.push(task);
        user.save();
        res.send(user.task);
      } else {
        res.status(401).send('Daily limit exceeded');
      }
    } else {
      res.status(404).send('Something went wrong please login again');
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

userRouter.get('/addtask', async (req, res) => {
  try {
    const {userid, token} = req.body;
    const user = await User.findOne({_id: userid});
    res.status(200).send(user.task);
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = userRouter;
