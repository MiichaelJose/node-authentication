import express from "express";

import mongoose from "mongoose";

import bodyParser from "body-parser";

import router from "./routes/authentication";

import 'dotenv/config';

const app = express();

const ENV: any = process.env;

app.use(bodyParser.json());
// conectar banco
mongoose
.connect(ENV.HOST_DATABASE)
.then(() => {
  console.log("Database connected successfully.");
  // Iniciar o servidor
  app.listen(ENV.PORT, () => {
    console.log(`Server is running on port : ${ENV.PORT} `);
  });
})
.catch((error) => console.log(error));

app.use(router);