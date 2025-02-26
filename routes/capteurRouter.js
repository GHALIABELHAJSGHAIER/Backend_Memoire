const express = require("express");
const router = express.Router();
const capteurController = require("../controllers/capteurControllers");

// Routes CRUD pour les appareils
 router.post('/addCapteurByIdEspace/:espaceId', capteurController.addCapteurByIdEspace); // Ajouter une appareil pour un client
 

module.exports = router;
