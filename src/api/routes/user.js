const userRoutes = require('express').Router();
const { register,login, deleteUser,getUsers,updateUser, makeAdmin} = require('../controllers/user');
const {isAuth,isAdmin} = require('../../middleware/auth');

userRoutes.post('/register',register);
userRoutes.post('/login',login);
userRoutes.delete('/:id',[isAuth, isAdmin],deleteUser);
userRoutes.put('/:id',[isAuth, isAdmin],updateUser);
userRoutes.put('/makeAdmin/:id',[isAuth, isAdmin],makeAdmin);
userRoutes.get('/',[isAuth,isAdmin],getUsers);

module.exports = userRoutes;