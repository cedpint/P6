const mongoose = require("mongoose");
const express = require("express");
const Sauce = require("../models/sauce.model");
const multer = require("../middleware/multer-config"); 
const sauce = require("../models/sauce.model");


const router = express.Router();


//Controllers importation
const sauceCtrl = require('../controllers/sauce');

//Route sauce qui affiche toutes les sauces
router.get('/', sauceCtrl.getAllSauces);

//Fonction permettant d'appeler une sauce
router.get('/:id', sauceCtrl.getOneSauce);

//Fonction permettant de créer des sauces
router.post('/', multer, sauceCtrl.createSauce);

//Fonction permettant de modifier une sauce
router.put('/:id', multer, sauceCtrl.modifySauce );

//Fonction permettant de supprimer une sauce
router.delete('/:id', sauceCtrl.deleteSauce);

//Fonction permettant de liker et disliker une sauce
router.post('/:id/like', sauceCtrl.likeDislike);

module.exports = router ;