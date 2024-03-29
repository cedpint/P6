const multer = require('multer');
// Resolves the appropriate file extension
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Create a storage constant to be passed to multer as configuration.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
/* Tells multer to use the original name replacing any spaces with
underscores and adding date.now() timestamp as the file name*/
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');