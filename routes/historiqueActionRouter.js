const express = require("express");
const router = express.Router();
const historiqueController = require("../controllers/historiqueActionControllers");

// Routes CRUD pour les historique 
router.post("/enregistrerAction", historiqueController.enregistrerAction);


 

module.exports = router;
