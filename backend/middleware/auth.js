// Import json web token dependency.
const jwt = require('jsonwebtoken');
const jwtBis = require('jsonwebtoken');
 
// Middleware to create token access for a unique user
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwtBis.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
