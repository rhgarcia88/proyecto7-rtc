const Consola = require("../models/consola");

//READ
const getConsolas = async(req,res,next) => {
  try {
      // Encuentra todos los datos de dicha coleccion
        const allConsolas = await Consola.find().populate('games');
        return res.status(200).json(allConsolas);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error en la petición");
  }
  };

  //POST 
const postConsola = async(req,res,next) => {
  try {
     const newConsola = new Consola(req.body);
      const consolaSaved = await newConsola.save();
      return res.status(201).json(consolaSaved);
  
  } catch (error) {
    return res.status(400).json("Error genérico");
    console.log(error);
    }
  }

  // UPDATE
const updateConsola = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newConsola = new Consola(req.body);
    newConsola._id = id;
    // findByIdAndUpdate me va a devolver el dato ANTIGUO
    const update = await Consola.findByIdAndUpdate(id, newConsola, { new: true });
    return res.status(200).json(update);
  } catch (error) {
    return res.status(400).json("Error");
  }
};

// DELETE
const deleteConsola = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Consola.findByIdAndDelete(id);
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(400).json("Error");
  }
};

  module.exports = {getConsolas,
  postConsola,
updateConsola,
deleteConsola};