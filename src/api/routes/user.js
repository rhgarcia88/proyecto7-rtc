const userRoutes = require('express').Router();
const { register,login, deleteUser,getUsers,updateUser} = require('../controllers/user');
const {isAuth,isAdmin} = require('../../middleware/auth');

userRoutes.post('/register',register);
userRoutes.post('/login',login);
userRoutes.delete('/:id',[isAuth, isAdmin],deleteUser);
userRoutes.put('/:id',[isAuth, isAdmin],updateUser);
userRoutes.get('/',[isAuth],getUsers);

module.exports = userRoutes;