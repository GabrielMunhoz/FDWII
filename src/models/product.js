const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
  },
  { versionKey: false },
);
module.exports = mongoose.model("Product", ProdutoSchema);
