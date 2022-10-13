const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Player = require("../models/player");
const playerValidations = require("../Validations/playerValidations");

const saltRounds = 10;

module.exports = {
  sigin(req, res) {
    let validation = playerValidations.validatePlayerLogin(req.body)
    if(validation.length <= 0)
    {
      if (req.body && req.body.nickname && req.body.password) {
        const bNickname = req.body.nickname;
        const bPassword = req.body.password;
        Player.findOne({ nickname: bNickname }, (err, user) => {
          if (err) res.status(500).send(err);
          else if (user) {
            let resultCrypt = bcrypt.compareSync(bPassword, user.password);
            if (resultCrypt) {
              const token = jwt.sign(
                {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role ? user.role : "player",
                },
                "Sen@crs",
                { expiresIn: "1h" }
              );
              res.status(201).json({ tokenInfo: token });
            } else {
              res.status(401).json({ message: "Falha ao realizar o login" });
            }
          }
          else{
            res.status(404).json({message: "Nao encontrado"});
          }
        });
      } else {
        res.status(404).json("Nao encontrado");
      }
    }
    else
    {
      res.status(400).json(validation)
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
          console.log(err);
          res.status(500)({message: "Erro ao consultar o jogador"});
        } else if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({message: "Nao encontrado"});
        }
      });
    } else {
      res.status(404).json({message:"nickname e necessario"});
    }
  },
  getById(req, res) {
    Player.findOne({ _id: req.params.id }, (err, user) => {
      if (err) {
        console.log(err)
        res.status(500)({message: "Erro ao consultar o jogador"});
      }
      if(user){
        res.status(200).json(user)
      }
      else{
        res.status(404).json({message: "Nao encontrado"});
      }
    });
  },
  post(req, res) {
    const p = new Player({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname,
      lastname: req.body.lastname,
      role: req.body.role,
    });

    let validations = playerValidations.validatePlayer(p);
    if (validations.length <= 0) {
      bcrypt.genSalt(saltRounds, (err1, salt) => {
        bcrypt.hash(p.password, salt, (err, hash) => {
          if (err) res.status(500).send(err);
          Player.findOne({ nickname: p.nickname }, (err, user) => {
            if (err) {
              res.send(err);
            } else if (user) {
              res.json({ message: "Jogador ja registrado!" }).status(400);
            } else {
              p.password = hash;
              p.save().then(
                (suc) => {
                  res.send({ message: "Jogador criado!" }).status(201);
                },
                (err) => {
                  console.log(err);
                  return res
                    .status(400)
                    .json({ message: "Falha ao salvar o jogador" });
                }
              );
            }
          });
        });
      });
    } 
    else {
      res.status(400).json(validations);
    }
  },
  put(req, res) {
    let validations = playerValidations.validatePlayer(req.body);
    if (validations.length <= 0) {
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
        }
      );
    } 
    else {
      res.status(400).json(validations);
    }
  },
  delete(req, res) {
    Player.findByIdAndDelete({ _id: req.params.id }, (err, user) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      if(user){
        res.send({ message: "Jogador excluido!" }).status(200);
      }
    });
  },
};
