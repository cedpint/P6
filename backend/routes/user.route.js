const mongoose = require("mongoose");

// Import express app
const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Controllers importation
const userCtrl = require('../controllers/user');

//User routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
