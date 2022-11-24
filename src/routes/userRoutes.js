const express = require('express');
const { signup,signin } = require('../controllers/userController');
const userRoute = express();

userRoute.post('/signup',signup);

userRoute.post('/signin',signin);


module.exports = userRoute;