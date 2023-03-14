const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Controllers importation
const userCtrl = require('../controllers/user');

//Signup function
router.post('/signup', userCtrl.signup);

//Login + token stockage de la session utilisateur 
router.post('/login', userCtrl.login);

module.exports = router;
