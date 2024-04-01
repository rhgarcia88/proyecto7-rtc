require("dotenv").config(); //Se configura en linea 1
const express = require('express');
const {connectDB} = require('./src/config/db');
const routerConsolas = require("./src/api/routes/consola");
const routerVideojuego = require("./src/api/routes/videojuego");
const userRoutes = require("./src/api/routes/user");

const app = express();
connectDB();

app.use(express.json()); //configurar server para recibir datos tipo json

app.use('/api/v1/consolas',routerConsolas);
app.use('/api/v1/videojuegos',routerVideojuego);
app.use('/api/v1/users',userRoutes);


app.use("*",  (req,res,next) => {
  return res.status(404).json("Route not found");
 });

app.listen(3000, ()=> {
  console.log('http://localhost:3000');
});


