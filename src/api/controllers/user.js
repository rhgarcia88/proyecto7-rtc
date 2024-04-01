const { generateSign } = require("../../config/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//Registrar usuario
const register = async (req, res, next) =>{
  try{
      
     const newUser = new User({
      nombreUsuario: req.body.nombreUsuario,
      email: req.body.email,
      contraseña: req.body.contraseña,  
      añoNacimiento: req.body.añoNacimiento,
      rol: req.body.rol,
      imagenPerfil: req.body.imagenPerfil    
     });

     const userDuplicated = await User.findOne({userName: req.body.userName});
      if(userDuplicated){
        return res.status(400).json("Ya existe este nombre de usuario");
      }
      const mailDuplicated = await User.findOne({email: req.body.email});
      if(mailDuplicated){
        return res.status(400).json("Ya existe un usuario con este email");
      }

     userSaved = await newUser.save();
     return res.status(201).json(userSaved);
  }catch(err){
    console.log(err);
      return res.status(400).json(err);
  }
}

//Login User
const login = async (req, res, next) =>{
  try{
    let user;
    if(req.body.nombreUsuario){
      user = await User.findOne({nombreUsuario: req.body.nombreUsuario});
    }else if(req.body.email){
      user = await User.findOne({email: req.body.email});
    }
   
      console.log(user);
    if(user){

      if(bcrypt.compareSync(req.body.contraseña,user.contraseña)){
        // Lo que pasa cuando te logueas con JWT
          const token = generateSign(user._id);
          return res.status(200).json({user,token});
      }else{
        return res.status(400).json("El usuario o la contraseña son incorrectos");
      }

    }else{
     console.log(user);
      return res.status(400).json("El usuario o la contraseña son incorrectos");
    }

  }catch(err){

  return res.status(400).json(err);
  }
}

//Borrar usuario
const deleteUser = async (req, res, next) =>{
try {

  const {id} = req.params;
  const userDeleted = await User.findByIdAndDelete(id);
  return res.status(200).json({mensaje: "Eliminado: ", userDeleted});

} catch (error) {
  console.log(error);
  return res.status(400).json(error);
}
}

const getUsers = async (req, res, next) =>{
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
}

const updateUser = async (req, res, next) =>{
  try {
    const { id } = req.params;
    const newUser = new User(req.body);
    newUser._id = id;
    if(req.body.contraseña){
      newUser.contraseña = bcrypt.hashSync(req.body.contraseña, 10);
    }
    
    const userUpdated = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });
    return res.status(200).json(userUpdated);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error en la solicitud");
  }
}

module.exports = {register,login,deleteUser,getUsers,updateUser}