const {getConsolas,postConsola,updateConsola,deleteConsola} = require('../controllers/consola');
const routerConsolas = require("express").Router();
const {isAuth,isAdmin} = require('../../middleware/auth');

routerConsolas.get("/", getConsolas);
routerConsolas.post("/", [isAuth,isAdmin] ,postConsola);
routerConsolas.put("/:id", [isAuth,isAdmin] ,updateConsola);
routerConsolas.delete("/:id", [isAuth,isAdmin] ,deleteConsola);

module.exports = routerConsolas;