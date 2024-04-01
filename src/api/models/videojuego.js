const mongoose = require('mongoose');

const videojuegoSchema = new mongoose.Schema({
  imgUrl:{type: String, required: false},
  name: {type: String, required: true},
  developer: {type: String, required:true},
  year: {type: Number, required:false}

},{
  timestamps:true,
  collection:"videojuegos"
});

const Videojuego = mongoose.model('videojuegos',videojuegoSchema,"videojuegos");
module.exports = Videojuego;