const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("User", UserSchema);
