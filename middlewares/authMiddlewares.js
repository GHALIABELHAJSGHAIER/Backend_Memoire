const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");

const requireAuthUser = async (req, res, next) => {
   const token = req.cookies.jwt_token_9antra;

   if (token) {
     jwt.verify(token, 'net secret pfe', async (err, decodedToken) => {
       if (err) {
         console.log("Erreur au niveau du token:", err.message);
         if (req.session) req.session.user = null;
         return res.status(401).json({ error: "Token invalide" });
       } else {
         if (!req.session) {
           console.log("⚠️ req.session est undefined !");
           return res.status(500).json({ error: "Session non initialisée" });
         }

         req.session.user = await userModel.findById(decodedToken.id);
         console.log("Utilisateur stocké dans la session:", req.session.user);
         next();
       }
     });
   } else {
     if (req.session) req.session.user = null;
     res.status(401).json({ error: "Pas de token fourni" });
   }
};

module.exports = { requireAuthUser };
