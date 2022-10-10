const mongoose = require("mongoose");
const app = require("./src/app");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/PlayersBookMongoDB");
  console.log("DB conected");
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

main()
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`application running on http://localhost:${port}`));
