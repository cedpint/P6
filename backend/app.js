const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model");

const sauceRoute = require("./routes/sauce.route");
const userRoute = require("./routes/user.route");
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

app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.put("/api/sauces", sauceRoute);


//creation d'un nouvel utilisateur dans la base de données//
app.get('/', async (req, res) => {
    await User.create({ email: "example@test.test", password: "test"});
    res.send('ok');
});

module.exports = app;