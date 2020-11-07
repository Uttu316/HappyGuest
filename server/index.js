const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const {mongoUrl} = require('./keys');

require('./modules/user-info');

const requireToken = require('./middleware/requireToken');
const authRoute = require('./routes/authRoutes/authRoute');
const userRoute = require('./routes/userRoutes/userRoute');
app.use(bodyParser.json());
app.use(authRoute);
app.use(userRoute);

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo database');
});

mongoose.connection.on('error', error => {
  console.log('Error occured in connected to mongo database', error);
});

app.get('/', requireToken, (req, res) => {
  res.send('your email is ' + req.user.email);
});
app.listen(PORT, () => {
  console.log('Server is running', PORT);
});
