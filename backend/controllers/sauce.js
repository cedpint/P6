const Sauce = require("../models/sauce.model");
const multer = require("../middleware/multer-config"); 
const fs = require('fs');

//Get all sauces function 
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => {
        return res.status(200).json(sauces);
    });
};

//Get one sauce function
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}))
};

//Add sauce function
exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObjet,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({message: "Sauce créée" }))
    .catch(error => res.status(400).json({ error }));    
};

//Modify function
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
// Application des paramètres sauceObject
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Sauce Modifiée !'}))
    .catch(error => res.status(401).json({ error }));
}

 
//Delete function
exports.deleteSauce = (req, res, next) => {
//Recherche de l'objet afin d'obtenir l'URL de l'image afin de la supprimer également
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1]
            // J'appelle unlink pour supprimer le fichier
            fs.unlink(`images/${filename}`, () => {
                // Je supprimer l'objet de la base de données
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error: error }))
            })
        })
        .catch(error => res.status(500).json({ error }));
};

//Like and dislike function
exports.likeDislike = (req, res, next) => {
   

    if (req.body.like === 1) {
        Sauce.updateOne({ _id: req.params.id }, {$inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
        .then(() => res.status(200).json({ message: 'Like ajoutée !'}))
        .catch(error => res.status(400).json({ error }))
    } else if (req.body.like === -1) {
        Sauce.updateOne({ _id: req.params.id}, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
        .then(() => res.status(200).json({ message: 'Dislike ajoutée !' }))
        .catch(error => res.status(400).json({ error }))
    } else { 
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.usersLiked.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes : -1 } })
                .then(() => res.status(200).json({ message: 'Like supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            } else if (sauce.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                .then(() => res.status(200).json({ message: 'Dislike supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
    }
};
