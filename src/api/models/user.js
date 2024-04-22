const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, trim: true, required: true, unique: true },
  nombreUsuario: { type: String, trim: true, required: true, unique: true },
  contraseña: { type: String, trim: true, required: true },
  añoNacimiento: { type: Number, trim: true, required: true },
  rol: { type: String, trim: true, required: true, default:"User" },
  imagenPerfil: { type: String, trim: true, required: true }
},{
  timestamps:true,
  collection:"users"
});

userSchema.pre("save", function() {
  this.contraseña = bcrypt.hashSync(this.contraseña, 10);
});


const User = mongoose.model('user',userSchema,"users");
module.exports = User;