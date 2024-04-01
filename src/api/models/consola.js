const mongoose = require('mongoose');

const consolaSchema = new mongoose.Schema({
  imgUrl:{type: String, required: false},
  name: {type: String, required: true},
  manufacturer: {type: String, required:true},
  year: {type: Number, required:false},
  games: [{type: mongoose.Types.ObjectId,ref: 'videojuegos'}]

},{
  timestamps:true,
  collection:"consolas"
});

const Consola = mongoose.model('consolas',consolaSchema,"consolas");
module.exports = Consola;