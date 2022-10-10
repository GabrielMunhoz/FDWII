const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Player = require("../models/player");

const saltRounds = 10;

module.exports = {
  sigin(req, res) {
    if (req.body && req.body.nickname && req.body.password) {
      const bNickname = req.body.nickname;
      const bPassword = req.body.password;
      Player.findOne({ nickname: bNickname }, (err, user) => {
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
    Player.find({}, (err, user) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json(user);
      }
    });
  },
  getbySearch(req, res) {
    if (req.query && req.query.nickname) {
      const paramNickname = req.query.nickname;
      Player.findOne({ nickname: paramNickname }, (err, user) => {
        if (err) {
          res.send(err);
        } else if (user) {
          res.json(user);
        } else {
          res.status(404).json("Not Found");
        }
      });
    } else {
      res.status(404).json("nickname is required");
    }
  },
  getById(req, res) {
    Player.findOne({ _id: req.params.id }, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  },
  post(req, res) {
    const p = new Player({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname,
      lastname: req.body.lastname,
    });

    bcrypt.genSalt(saltRounds, (err1, salt) => {
      bcrypt.hash(p.password, salt, (err, hash) => {
        if (err) res.status(500).send(err);
        Player.findOne({ nickname: paramNickname }, (err, user) => {
          if (err) {
            res.send(err);
          } else if (user) {
            res.json(user);
          } else {
            res.status(404).json("Not Found");
          }
        });


        p.password = hash;
        p.save();
        res.send("Player created!").status(200);
      });
    });
  },
  put(req, res) {
    Player.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { upsert: true },
      (err, user) => {
        if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
        }
        res.json(req.body);
        res.end();
      },
    );
  },
  delete(req, res) {
    Player.findByIdAndDelete({ _id: req.params.id }, (err, user) => {
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
