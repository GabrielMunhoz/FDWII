const Advertisement = require("../models/advertisement");

module.exports = {
  get(req, res) {
    Advertisement.find({}, (err, products) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json(products);
    });
  },
  getById(req, res) {
    Advertisement.findOne({ _id: req.params.id }, (err, product) => {
      if (err) {
        res.send(err);
      }
      res.json(product);
    }).populate("playerHost").populate("gameCategory").populate("guests");
  },
  post(req, res) {
    const newAdvertisement = new Advertisement({
      gameCategory: req.body.gameCategory,
      groupCategory: req.body.groupCategory,
      isActive: true,
      playerHost: req.body.playerHost,
    });

    newAdvertisement.save();

    res.send("Anuncio inserido!").status(200);
  },
  put(req, res) {
    Advertisement.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { upsert: true },
      (err, product) => {
        if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
        }
        res.json(product);
        res.end();
      },
    );
  },
  delete(req, res) {
    Advertisement.find({ _id: req.params.id }).remove((err, product) => {
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
