const {Router} = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const taskRouter = Router();

taskRouter.post('/addtask/:userid', async (req, res) => {
  try {
    const {userid} = req.params;
    const {task} = req.body;
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

taskRouter.get('/gettask/:userid', async (req, res) => {
  try {
    const {userid} = req.params;
    const user = await User.findOne({_id: userid});
    if (user.task) {
      res.status(200).send({message: 'Task', tasks: user.task});
    } else
      res
        .status(204)
        .send({message: 'Please add some tasks for today', tasks: []});
  } catch (error) {
    res.status(401).send(error);
  }
});

taskRouter.put('/updatetask/:userid', async (req, res) => {
  const {userid} = req.params;
  try {
    const user = await User.findOne({_id: userid});
    user.task = [];
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = taskRouter;
