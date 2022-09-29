const express = require("express");

const app = express();

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));

// app.use(trataLog);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

module.exports = app;
