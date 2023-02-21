const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Sauce = require("../models/sauce.model");

//Route sauces qui renvoie contenu base de données

router.get('/', (req, res) => {
    Sauce.find()
    .then((sauces) => {
        return res.status(200).json(sauces);
    });
});

//Fonction permettant d'ajouter des sauces

router.post('/', (req, res) => {
    const { sauce } = req.body;

    Sauce.create(sauce)
    .then((createdSauce) => {
        console.log(createdSauce);
        return res.status(201).json({message: "Sauce créée" });
    });

});

module.exports = router ;