const express = require("express");

const app = express();

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const loginRouter = require("./routes/loginRouter");
const InterceptToken = require("./routes/InterceptToken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));

app.use("/api/login", loginRouter);
app.use(InterceptToken.verifyJWT);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

module.exports = app;
