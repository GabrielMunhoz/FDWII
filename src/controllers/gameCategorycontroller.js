const GameCategory = require("../models/gameCategory");
const GameCategoryValidation = require("../Validations/gameCategoryValidations");

module.exports = {
  get(req, res) {
    GameCategory.find({}, (err, categorys) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Falha ao obter as categorias de jogos" });
        return;
      }
      res.status(200).json(categorys);
    });
  },
  getById(req, res) {
    GameCategory.findOne({ _id: req.params.id }, (err, category) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Falha ao obter a categoria de jogo" });
        return;
      }
      if (category) {
        res.status(201).json(category);
      } else {
        res.status(404).json("Nao encontrado");
      }
    });
  },
  post(req, res) {
    const newGameCategory = new GameCategory({
      name: req.body.name,
      boxArtUrl: req.body.boxArtUrl,
    });

    let validation =
      GameCategoryValidation.validateGameCategory(newGameCategory);

    if (validation > 0) return res.status(400).send(validation);

    GameCategory.findOne(
      { name: newGameCategory.name },
      (err, gameCategory) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "Falha ao obter a categoria de jogo" });
          return;
        } else if (gameCategory) {
          res.status(400).send({ message: "Categoria de jogo já existente!" });
        } else {
          newGameCategory.save().then(
            (suc) => {
              res.status(201).send({ message: "Categoria de jogo inserido!" });
            },
            (err) => {
              console.log(err);
              res.status(500)({ message: "Erro ao consultar o jogador" });
            }
          );
        }
      }
    );
  },
  put(req, res) {
    let validation = GameCategoryValidation.validateGameCategory(req.body);
    
    if (validation.length > 0) return res.status(400).send(validation);
    else
    {
      GameCategory.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { upsert: true },
        (err, category) => {
          if (err) {
            console.log(err);
            res
              .status(500)
              .json({ message: "Falha ao atualizar a categoria de jogo" });
            return;
          }
          if(category)
          {
            return res.status(200).json(category);
          }
          else
          {
            res.status(404).json("Nao encontrado");
          }
        }
      );
    }
    
  },
  delete(req, res) {
    GameCategory.find({ _id: req.params.id }).remove((err, category) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Falha ao deletar a categoria de jogo" });
        return;
      }
      if (category) {
        res.status(200).json({ message: "Categoria de jogo deletada!" });
      } else {
        res
          .status(500)
          .json({ message: "Erro ao deletar a categoria de jogo" });
      }
    });
  },
};
