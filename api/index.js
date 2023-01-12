const express = require('express');
const cors = require('cors');
const connection = require('./database/db.js');
require('dotenv').config();
const userRouter = require('./routes/UserRoute.js');

const app = express();
const port = process.env.PORT || 8080;
connection();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello world');
});
app.use('/api/user', userRouter);

app.listen(port, () =>
  console.log(`Server is runnin on http://localhost:${port}`)
);
