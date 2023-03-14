const multer = require('multer');

// Traduction des images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Création de l'objet de configuration de multer
// Utilisation de la méthode diskStorage de multer pour l'enregistrer sur le disk
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
// Indication du nom de fichier à utiliser pour multer
// Utilisation de la méthode split & join enlever les éspaces et les remplacer par des underscore
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');