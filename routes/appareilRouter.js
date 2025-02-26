const express = require("express");
const router = express.Router();
const appareilController = require("../controllers/appareilControllers");

// Routes CRUD pour les appareils
router.post('/addAppareilByIdClient/:clientId', appareilController.addAppareilByIdClient); // Ajouter une appareil pour un client
router.post('/addAppareilByIdEspace/:espaceId', appareilController.addAppareilByIdEspace); // Ajouter une appareil pour un client
router.get("/getAllAppareil", appareilController.getAllAppareil);
router.get("/getAllAppareilByIdClient/:clientId", appareilController.getAllAppareilByIdClient);
router.get("/getAllAppareilByIdEspace/:espaceId", appareilController.getAllAppareilByIdEspace);
router.put("/updateAppareilByIdClient/:clientId/:appareilId", appareilController.updateAppareilByIdClient);
router.put("/updateAppareilByIdEspace/:espaceId/:appareilId", appareilController.updateAppareilByIdEspace);
router.put("/updateAppareil/:appareilId", appareilController.updateAppareil);
router.delete("/deleteAppareil/:appareilId", appareilController.deleteAppareil);
router.put("/allumerAppareil/:id", appareilController.allumerAppareil);
router.put("/eteindreAppareil/:id", appareilController.eteindreAppareil);
router.put("/mesurerConsommation/:id", appareilController.mesurerConsommation);

module.exports = router;
