const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { versionKey: false },
);
module.exports = mongoose.model("Product", ProdutoSchema);
