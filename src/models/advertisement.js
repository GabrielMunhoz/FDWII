const mongoose = require("mongoose");

const AdvertisementSchema = new mongoose.Schema(
  {
    gameCategory: { type: mongoose.Schema.Types.ObjectId, ref: "GameCategory" },
    groupCategory: String,
    isActive: Boolean,
    playerHost: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  },
  { versionKey: false },
);
module.exports = mongoose.model("Advertisement", AdvertisementSchema);
