const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const cors = require('cors');
const bcrypt = require('bcrypt');

mongoose.connect ('mongodb+srv://piiquante:piiquante@cluster0.aw1rvuo.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('MongoDB connecté');
})
.catch(() => {
    console.log('MongoDB erreur');
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

//middleware permettant au frontend a se connecter a l'API//
app.use(cors());

app.use(express.json());

//creation d'un nouvel utilisateur dans la base de données//
app.get("/", async (req,res) => {
    await User.create({ email: 'example@test.test', password: 'test'});
    res.send('ok');
});


//Route signup recuperation de la creation du login utilisateur + hashage password//
app.post('/api/auth/signup', async (req,res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
     .then (async (hash) => {
        await User.create({ email: req.body.email, password: hash });
        res.status(201).json({ message: "Uilisateur créé" })
     }) 
     .catch(() => {
        res.status(500).json({ error: "Erreur lors du hashage du mot de passe" });
     }); 
});


