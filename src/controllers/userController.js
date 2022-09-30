const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const saltRounds = 10;

module.exports = {
  sigin(req, res) {
    if (req.body && req.body.email && req.body.password) {
      const bEmail = req.body.email;
      const bPassword = req.body.password;
      User.findOne({ email: bEmail }, (err, user) => {
        if (err) res.status(500).send(err);
        else if (user) {
          bcrypt.compare(bPassword, user.password, (err1, result) => {
            if (err1) {
              res.status(500).send(err1);
            }
            if (result) {
              const token = jwt.sign(
                {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
                "Sen@crs",
                { expiresIn: "1h" },
              );
              res.status(201).json({ tokenInfo: token });
            }
          });
        } else {
          res.status(401).json({ err: "Login failed" });
        }
      });
    } else {
      res.status(404).json("Not Found");
    }
  },
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

    bcrypt.genSalt(saltRounds, (err1, salt) => {
      bcrypt.hash(p.password, salt, (err, hash) => {
        if (err) res.status(500).send(err);
        p.password = hash;
        p.save();
        res.send("User created!").status(200);
      });
    });
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
