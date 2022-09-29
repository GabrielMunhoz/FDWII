const Product = require("../models/product");

module.exports = {
  get(req, res) {
    Product.find({}, (err, products) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json(products);
    });
  },
  getById(req, res) {
    Product.findOne({ _id: req.params.id }, (err, product) => {
      if (err) {
        res.send(err);
      }
      res.json(product);
    });
  },
  post(req, res) {
    const p = new Product({
      name: req.body.name,
      price: req.body.price,
    });

    p.save();

    res.send("Produto inserido!").status(200);
  },
  put(req, res) {
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err, product) => {
      if (err) {
        res.status(500).json({ error: err.message });
        res.end();
        return;
      }
      res.json(product);
      res.end();
    });
  },
  delete(req, res) {
    Product.find({ _id: req.params.id }).remove((err, product) => {
      if (err) {
        res.status(500).json({ error: err.message });
        res.end();
        return;
      }
      res.json(product);
      res.end();
    });
  },
};
