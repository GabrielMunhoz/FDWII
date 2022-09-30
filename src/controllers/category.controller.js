const Category = require("../models/category");

module.exports = {
  get(req, res) {
    Category.find({}, (err, categorys) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json(categorys);
    });
  },
  getById(req, res) {
    Category.findOne({ _id: req.params.id }, (err, category) => {
      if (err) {
        res.send(err);
      }
      res.json(category);
    });
  },
  post(req, res) {
    const p = new Category({
      name: req.body.name,
    });

    p.save();

    res.status(200).send("Produto inserido!");
  },
  put(req, res) {
    Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { upsert: true },
      (err, category) => {
        if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
        }
        res.json(category);
        res.end();
      },
    );
  },
  delete(req, res) {
    Category.find({ _id: req.params.id }).remove((err, category) => {
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
