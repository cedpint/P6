const express = require("express");
const mongoose = require("mongoose");

const app = express();
//JSON body parser
app.use(express.json());
const cors = require("cors");

const sauceRoute = require("./routes/sauce.route");
const userRoute = require("./routes/user.route");
const path = require("path");

require('dotenv').config();

//MongoDB connexion
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
    

// Use CORS to allow the front-end and back-end to communicate because they have different origins.
app.use(cors());

//Routes
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.put("/api/sauces", sauceRoute);


module.exports = app;