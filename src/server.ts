import express from "express";

import mongoose from "mongoose";

import bodyParser from "body-parser";

import router from "./routes/authentication";

const app = express();

app.use(bodyParser.json());

const port = 3001;
// conectar banco
mongoose
.connect("mongodb://localhost:27017/authentication")
.then(() => {
  console.log("Database connected successfully.");
  // Iniciar o servidor
  app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });
})
.catch((error) => console.log(error));

app.use(router);