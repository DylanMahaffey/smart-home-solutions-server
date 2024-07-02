import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import path from "path";

import indexRouter from './src/routes/index'
import deviceRouter from './src/routes/deviceRoutes'
import plugRouter from './src/routes/plugRoutes'

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = 80;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/device', deviceRouter);
app.use('/plug', plugRouter);

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});