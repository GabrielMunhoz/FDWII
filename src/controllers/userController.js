const User = require("../models/user");

module.exports = {
  getAll(req, res) {
    User.find({}, (err, user) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json(user);
      }
    });
  },
  getbySearch(req, res) {
    if (req.query && req.query.email) {
      const paramEmail = req.query.email;
      User.findOne({ email: paramEmail }, (err, user) => {
        if (err) {
          res.send(err);
        } else if (user) {
          res.json(user);
        } else {
          res.status(404).json("Not Found");
        }
      });
    } else {
      res.status(404).json("Email is required");
    }
  },
  getById(req, res) {
    User.findOne({ _id: req.params.id }, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  },
  post(req, res) {
    const p = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    p.save();

    res.send("User created!").status(200);
  },
  put(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { upsert: true },
      (err, user) => {
        if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
        }
        res.json(user);
        res.end();
      },
    );
  },
  delete(req, res) {
    User.findByIdAndDelete({ _id: req.params.id }, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
        res.end();
        return;
      }
      res.json(user);
      res.end();
    });
  },
};
