const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const xmlparser = require("express-xml-bodyparser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(xmlparser());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const foods = require("./routes/foods");
// const customers = require("./routes/customers");

app.use("/foods", foods);
// app.use("/customers", customers);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
