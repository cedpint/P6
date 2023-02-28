const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const Sauce = require("./models/sauce.model");
const userRoute = require("./routes/user.route");
const sauceRoute = require("./routes/sauce.route");
const path = require("path");

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

app.use(cors());


app.use(express.json());

app.use("/api/sauces", sauceRoute);
app.use("/api/auth", userRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));


//middleware permettant au frontend de se connecter a l'API//


//creation d'un nouvel utilisateur dans la base de données//
app.get('/', async (req, res) => {
    await User.create({ email: "example@test.test", password: "test"});
    res.send('ok');
});



