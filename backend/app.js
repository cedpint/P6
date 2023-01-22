const express = require("express")
const app = express()
const mongoose = require('mongoose')
const { Schema } = mongoose;
const cors = require('cors');

mongoose.connect ('mongodb+srv://piiquante:piiquante@cluster0.aw1rvuo.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('MongoDB connecté');
})
.catch(() => {
    console.log('MongoDB erreur');
});

const userSchema = new Schema({
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);  

app.use(cors());

app.use(express.json());

app.post('/api/auth/singup', async (req,res) => {
    console.log(req.body);
    await User.create({ email: req.body.email, password: req.body.password });
    res.send('ok');
});

app.get("/", async (req,res) => {
    await User.create({ email: 'example@test.test', password: 'test'});
    res.send('ok');
});

app.listen("3000", () => {
    console.log("serveur ok")
});