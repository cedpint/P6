const express = require("express");
const mongoose = require("mongoose");

const app = express();
//JSON body parser
app.use(express.json());
const cors = require("cors");

const sauceRoute = require("./routes/sauce.route");
const userRoute = require("./routes/user.route");
const path = require("path");

//MongoDB connexion
mongoose
.connect ("mongodb+srv://piiquante:piiquante@cluster0.otlnlvk.mongodb.net/?retryWrites=true&w=majority")                 
.then(() => {
    console.log('MongoDB connecté');
})
.catch((error) => {
    console.log(error);
});

// Use CORS to allow the front-end and back-end to communicate because they have different origins.
app.use(cors());

//Routes
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.put("/api/sauces", sauceRoute);


module.exports = app;