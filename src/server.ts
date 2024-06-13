import express from "express";

import mongoose from "mongoose";

import bodyParser from "body-parser";

import router from "./routes/authentication";

const app = express();

const PORT = 3001;

app.use(bodyParser.json());
// conectar banco
mongoose
.connect("mongodb://localhost:27017/authentication")
.then(() => {
  console.log("Database connected successfully.");
  // Iniciar o servidor
  app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT} `);
  });
})
.catch((error) => console.log(error));

app.use(router);