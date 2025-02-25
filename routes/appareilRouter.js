const express = require("express");
const router = express.Router();
const appareilController = require("../controllers/appareilControllers");

// Routes CRUD pour les appareils
router.post("/", appareilController.ajouterAppareil);
router.get("/", appareilController.getAppareils);
router.put("/:id/allumer", appareilController.allumerAppareil);
router.put("/:id/eteindre", appareilController.eteindreAppareil);
router.put("/:id/consommation", appareilController.mesurerConsommation);

module.exports = router;
