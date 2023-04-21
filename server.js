const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Database connection
mongoose.connect('mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Social Network API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// Models
const User = require('./models/user');

// Create a user
app.post('/users', (req, res) => {
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(user);
    }
  });
});

// Get a user
app.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(user);
    }
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(user);
    }
  });
});

// Add a friend
app.post('/users/:id/friends', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $push: { friends: req.body.friend } },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(user.friends);
      }
    }
  );
});

// Get list of friends
app.get('/users/:id/friends', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(user.friends);
    }
  });
});

// Remove a friend
app.delete('/users/:id/friends/:friendId', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $pull: { friends: req.params.friendId } },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(user.friends);
      }
    }
  );
});
