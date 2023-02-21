const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

mongoose
.connect ("mongodb+srv://piiquante:piiquante@cluster0.otlnlvk.mongodb.net/?retryWrites=true&w=majority")                 
.then(() => {
    console.log('MongoDB connecté');
})
.catch((error) => {
    console.log(error);
});

app.listen("3000", () => {
    console.log("serveur ok")
});

//Creation de schemas-modeles//

const userSchema = new Schema({
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);  

const sauceSchema = new Schema({
    userId: String,
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageurl : String,
    likes: Number,
    dislikes: Number,
    usersLiked: [String],
    userDisliked: [String]
});

const Sauce = mongoose.model('Sauce', sauceSchema);

//middleware permettant au frontend de se connecter a l'API//
app.use(cors());

app.use(express.json());

//creation d'un nouvel utilisateur dans la base de données//
app.get('/', async (req, res) => {
    await User.create({ email: "example@test.test", password: "test"});
    res.send('ok');
});


//Route signup recuperation de la creation du login utilisateur + hashage password//
app.post('/api/auth/signup', async (req, res) => {
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
});

//Route login + token stockage de la session utilisateur 
app.post('/api/auth/login', (req, res) => {
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
                 {
                userId: user.id,
                 },     
                "SECRET_TOKEN",
                 {
                expiresIn: "24h",
                 }
                ),
            });
        })  
        .catch(() => {
            return res.status(500).json({ error : "Erreur lors de la comparaison du mot de passe" });
        });
    });
});

//Routes sauces qui renvoie contenu base de données

app.get('/api/sauces', (req, res) => {
    Sauce.find()
    .then((sauces) => {
        return res.status(200).json(sauces);
    });
});

//Fonction permettant d'ajouter des sauces

app.post('/api/sauces', (req, res) => {
    const { sauce } = req.body;

    Sauce.create(sauce)
    .then((createdSauce) => {
        console.log(createdSauce);
        return res.status(201).json({message: "Sauce créée" });
    });

});