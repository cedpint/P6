const mongoose = require("mongoose");
const express = require("express");
const Sauce = require("../models/sauce.model");
const multer = require("../middleware/multer-config"); 
const sauce = require("../models/sauce.model");
 const auth = require("../middleware/auth");

const router = express.Router();


//Controllers importation
const sauceCtrl = require('../controllers/sauce');

//Route sauce qui affiche toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

//Fonction permettant d'appeler une sauce
router.get('/:id', auth,sauceCtrl.getOneSauce);

//Fonction permettant de créer des sauces
router.post('/', auth, multer, sauceCtrl.createSauce);

//Fonction permettant de modifier une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce );

//Fonction permettant de supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Fonction permettant de liker et disliker une sauce
router.post('/:id/like', auth, sauceCtrl.likeDislike);

module.exports = router ;