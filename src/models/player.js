const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const PlayerSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    nickname: String,
    lastname: String,
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("Player", PlayerSchema);
