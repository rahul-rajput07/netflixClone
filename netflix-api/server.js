const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const dbString = process.env.DATABASE;
mongoose
  .connect(`${dbString}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  });

app.use("/api/user", userRoutes);

app.listen(5000, console.log("Server started"));
