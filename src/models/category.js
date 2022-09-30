const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false },
);
module.exports = mongoose.model("Category", CategorySchema);
