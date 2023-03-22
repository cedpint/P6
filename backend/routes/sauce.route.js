// Import express app
const express = require("express");
const router = express.Router();

//utile??
const mongoose = require("mongoose");
const Sauce = require("../models/sauce.model");
const sauce = require("../models/sauce.model");

// Import middelware
const multer = require("../middleware/multer-config"); 
const auth = require("../middleware/auth");

// Import sauce controller
const sauceCtrl = require('../controllers/sauce');

// Routes for sauce
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth,sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce );
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Like and dislike function controller
router.post('/:id/like', auth, sauceCtrl.likeDislike);

module.exports = router ;