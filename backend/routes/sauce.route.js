const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Sauce = require("../models/sauce.model");
const multer = require("../middleware/multer-config"); 

const sauce = require("../models/sauce.model");

//Route sauces qui affiche toutes les sauces

router.get('/', (req, res) => {
    Sauce.find()
    .then((sauces) => {
        return res.status(200).json(sauces);
    });
});

//Fonction permettant d'appeler une sauce
router.get('/:id', (req, res) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}))
});

//Fonction permettant d'ajouter des sauces
router.post('/', multer, (req, res) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObjet,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log("mysauce",sauce)

    sauce.save()
    .then((createdSauce) => {
        //console.log(createdSauce);
        return res.status(201).json({message: "Sauce créée" });
    });

});

module.exports = router ;