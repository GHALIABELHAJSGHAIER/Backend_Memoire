const express = require("express");
const router = express.Router();
const garageController = require("../controllers/garageControllers");

// Routes pour les garage
router.post("/createGarage", garageController.createGarage);
router.put("/updatePortGarageByIdGarage/:id", garageController.updatePortGarageByIdGarage);
router.get("/getPortGarageByIdGarage/:id", garageController.getPortGarageByIdGarage);
router.get("/getPortGarageByIdMaison/:id", garageController.getPortGarageByIdMaison);
router.get("/getHistoriqueByGarageId/:id", garageController.getHistoriqueByGarageId);
router.delete('/deleteHistoriqueById/:id', garageController.deleteHistoriqueById);

module.exports = router;
// createGarage updatePortGarageByIdGarage getPortGarageByIdGarage 