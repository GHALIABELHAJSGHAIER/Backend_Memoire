const express = require("express");
const router = express.Router();
const alarmeController = require("../controllers/alarmeControllers");

// Routes pour les garage
 router.post("/createAlarme", alarmeController.createAlarme);
 router.get("/getAlarmeByIdMaison/:id", alarmeController.getAlarmeByIdMaison);
 router.put("/updateEtatAlarmeByIdAlarme/:id", alarmeController.updateEtatAlarmeByIdAlarme);
 router.put("/updateAlarmeByIdAlarme/:id", alarmeController.updateAlarmeByIdAlarme);
 router.get("/getEtatAlarmeByIdAlarme/:id", alarmeController.getEtatAlarmeByIdAlarme);
//      router.get("/getHistoriqueByGarageId/:id", garageController.getHistoriqueByGarageId);
module.exports = router;
 // createGarage updatePortGarageByIdGarage getPortGarageByIdGarage 