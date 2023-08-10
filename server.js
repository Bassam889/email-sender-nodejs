require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const email = require("./routes/route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};
app.use(cors(corsOptions));
app.use("/email", email);

app.get("/", (req, res) => {
  res.status(200).send("HOLA AMIGOS!");
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}...`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

start();
