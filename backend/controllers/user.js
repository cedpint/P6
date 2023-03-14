const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Signup function
exports.signup = (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({error: "Veuillez remplir tous les champs"});
    }

 bcrypt
    .hash(req.body.password, 10)
    .then (async (hash) => {
        const user = await User.create({ email: req.body.email, password: hash });
        if(!user) {
            return res.status(400).json({ error: "Erreur lors de la création de l'utilisateur" });
        }
        return res.status(201).json({ message: "Uilisateur créé" });
     }) 
     .catch(() => {
        res.status(500).json({ error: "Erreur lors du hashage du mot de passe" });
     });   
};

//Login function
exports.login = (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({error: "Veuillez remplir tous les champs"});
    }

    User.findOne({ email : email }).then((user) => {
        if(!user) {
            return res.status(404).json({error : "Paire identification/mot de passe incorrecte"});
        }

        bcrypt
        .compare(password, user.password)
        .then((valid) => {
            if(!valid){
               return res.status(400).json({error : "Paire identification/mot de passe incorrecte"});
            }

            return res.status(200).json({
                userId : user._id,
                token: jwt.sign(
                 { userId: user._id },     
                "RANDOM_TOKEN_SECRET",
                 { expiresIn: "24h" }
                )
            });
        })  
        .catch(() => {
            return res.status(500).json({ error : "Erreur lors de la comparaison du mot de passe" });
        });
    });
};
