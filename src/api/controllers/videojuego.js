const Videojuego = require("../models/videojuego");

//READ
const getVideojuegos = async(req,res,next) => {
  try {
      // Encuentra todos los datos de dicha coleccion
        const allVideojuegos = await Videojuego.find();
        return res.status(200).json(allVideojuegos);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error en la petición");
    
  }
  };

    //POST 
const postVideojuego = async(req,res,next) => {
  try {
     const newVideojuego = new Videojuego(req.body);
      const videojuegoSaved = await newVideojuego.save();
      return res.status(201).json(videojuegoSaved);
  
  } catch (error) {
    return res.status(400).json("Error genérico");
    console.log(error);
    }
  }

    // UPDATE
const updateVideojuego = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newVideojuego = new Videojuego(req.body);
    newVideojuego._id = id;
    // findByIdAndUpdate me va a devolver el dato ANTIGUO
    const up = await Videojuego.findByIdAndUpdate(id, newVideojuego, { new: true });
    return res.status(200).json(up);
  } catch (error) {
    return res.status(400).json("Error");
  }
};

// DELETE
const deleteVideojuego = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Videojuego.findByIdAndDelete(id);
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(400).json("Error");
  }
};

module.exports = {
  getVideojuegos,
  postVideojuego,
  updateVideojuego,
  deleteVideojuego
}