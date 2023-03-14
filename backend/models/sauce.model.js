const mongoose = require("mongoose");
const { Schema } = mongoose;

const sauceSchema = new Schema({
    userId: String,
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageUrl : String,
    heat : Number,
    likes: Number,
    dislikes: Number,
    usersLiked : {type: [String], default: []},
    usersDisliked : {type: [String], default: []},
});

const Sauce = mongoose.model('Sauce', sauceSchema);

module.exports = Sauce;