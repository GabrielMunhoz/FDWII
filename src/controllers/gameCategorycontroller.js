const GameCategory = require("../models/gameCategory");
const GameCategoryValidation = require("../Validations/gameCategoryValidations");

module.exports = {
  get(req, res) {
    GameCategory.find({}, (err, categorys) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json(categorys);
    });
  },
  getById(req, res) {
    GameCategory.findOne({ _id: req.params.id }, (err, category) => {
      if (err) {
        res.send(err);
      }
      res.json(category);
    });
  },
  post(req, res) {
    const newGameCategory = new GameCategory({
      name: req.body.name,
      boxArtUrl: req.body.boxArtUrl,
    });

    if (!GameCategoryValidation.validateGameCategory(newGameCategory)) return res.status(400).send("Atributos obrigatórios não informados");

    GameCategory.findOne({ name: newGameCategory.name }, (err, gameCategory) => {
      if (err) {
        res.status(500).send(err);
      } else if (gameCategory) {
        res.status(400).send("jogo já existente!");
      } else {
        newGameCategory.save();
        res.status(200).send("Jogo inserido!");
      }
    });
  },
  put(req, res) {
    if (!GameCategoryValidation.validateGameCategory(req.body)) return res.status(400).send("Atributos obrigatórios não informados");

    GameCategory.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { upsert: true },
      (err, category) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.json(category);
      },
    );
  },
  delete(req, res) {
    GameCategory.find({ _id: req.params.id }).remove((err, category) => {
      if (err) {
        res.status(500).json({ error: err.message });
        res.end();
        return;
      }
      res.json(category);
      res.end();
    });
  },
};
