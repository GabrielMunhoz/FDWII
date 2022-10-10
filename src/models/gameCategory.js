const mongoose = require("mongoose");

const GameCategorySchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    boxArtUrl: String,
  },
  { versionKey: false },
);
module.exports = mongoose.model("GameCategory", GameCategorySchema);
