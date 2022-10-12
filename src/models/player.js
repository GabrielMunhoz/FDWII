const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const PlayerSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    nickname: String,
    lastname: String,
    role: String,
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("Player", PlayerSchema);
