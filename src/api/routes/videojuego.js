const {getVideojuegos,postVideojuego,updateVideojuego,deleteVideojuego} = require('../controllers/videojuego');
const routerVideojuego = require("express").Router();
const {isAuth,isAdmin} = require('../../middleware/auth');

routerVideojuego.get("/",getVideojuegos);
routerVideojuego.post("/",[isAuth,isAdmin],postVideojuego);
routerVideojuego.delete("/:id", [isAuth,isAdmin], deleteVideojuego);
routerVideojuego.put("/:id", [isAuth,isAdmin], updateVideojuego);

module.exports = routerVideojuego;