const mongoose = require("mongoose");
const { Schema } = mongoose;

const sauceSchema = new Schema({
    userId: String,
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageUrl : String,
    likes: Number,
    dislikes: Number,
    usersLiked: [String],
    userDisliked: [String]
});

const Sauce = mongoose.model('Sauce', sauceSchema);

module.exports = Sauce;