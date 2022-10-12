const express = require("express");

const app = express();

const advertisementRouter = require("./routes/advertisementRouter");
const playerRouter = require("./routes/playerRouter");
const gameCategoryRouter = require("./routes/gameCategoryRouter");
const loginRouter = require("./routes/loginRouter");
const InterceptToken = require("./routes/InterceptToken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));

app.use("/api/login", loginRouter);
app.use(InterceptToken.verifyJWT);
app.use("/api/players", playerRouter);
app.use("/api/gameCategories", gameCategoryRouter);
app.use("/api/advertisements", advertisementRouter);

module.exports = app;
