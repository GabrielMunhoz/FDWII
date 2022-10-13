const Advertisement = require("../models/advertisement");
const advertisementValidations = require("../Validations/advertisementValidations");

module.exports = {
  get(req, res) {
    Advertisement.find({}, (err, advertisement) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: "Falha ao deletar o usuario" });
        return;
      }
      res.status(200).json(advertisement);
    });
  },
  getById(req, res) {
    Advertisement.findOne({ _id: req.params.id }, (err, advertisement) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: "Falha ao obter o anuncio" });
        return;
      }
      if(advertisement)
      {
        res.status(200).json(advertisement);
      }
      else
      {
        res.status(404).json({message: "Nao encontrado"});
      }
    })
      .populate("playerHost")
      .populate("gameCategory")
      .populate("guests");
  },
  post(req, res) {
    const newAdvertisement = new Advertisement({
      gameCategory: req.body.gameCategory,
      groupCategory: req.body.groupCategory,
      isActive: true,
      playerHost: req.body.playerHost,
    });
    let validations =
      advertisementValidations.validateAdvertisement(newAdvertisement);
    if (validations.length <=0 ) {
      newAdvertisement.save().then(
        suc => {
          res.status(201).json({ message: "anuncio criado com sucesso" });
        },
        err => {
          console.log(err);
          return res.status(400).json({ message: "Falha ao salvar o anuncio" });
        }
      );
    } else {
      res.status(400).json(validations);
    }
  },
  put(req, res) {
    let validation = advertisementValidations.validateAdvertisement(req.body);
    if(validation.length > 0) return res.status(400).json(validations);

    Advertisement.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { upsert: true },
      (err, advertisement) => {
        if (err) {
          console.log(err)
          res.status(500).json({ message: "Falha ao atualizar o anuncio" });
        }
        res.status(200).json(advertisement);
      }
    );
  },
  delete(req, res) {
    Advertisement.find({ _id: req.params.id }).remove((err, advertisement) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: "Falha ao deletar o anuncio" });
        return;
      }
      if(advertisement){
        res.status(200).send({ message: "Anuncio excluido!" });
      }
    });
  },
};
