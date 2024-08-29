import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors'
import router from "./routes/authentication";
import 'dotenv/config';

const app = express();

const ENV: any = process.env;

app.use(cors())
app.use(bodyParser.json());
mongoose
.connect(ENV.HOST_DATABASE)
.then(() => {
  console.log("Database connected successfully.");
  app.listen(ENV.PORT, () => {
    console.log(`Server is running on port : ${ENV.PORT} `);
  });
})
.catch((error: any) => console.log(error));

app.use(router);