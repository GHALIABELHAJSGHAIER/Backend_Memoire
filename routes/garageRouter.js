const express = require("express");
const router = express.Router();
const garageController = require("../controllers/garageControllers");

// Routes pour les garage
 router.post("/createGarage", garageController.createGarage);
  router.put("/updatePortGarageByIdGarage/:id", garageController.updatePortGarageByIdGarage);
  router.get("/getPortGarageByIdGarage/:id", garageController.getPortGarageByIdGarage);
   router.get("/getPortGarageByIdClient/:id", garageController.getPortGarageByIdClient);
     router.get("/getHistoriqueByGarageId/:id", garageController.getHistoriqueByGarageId);
module.exports = router;
 // createGarage updatePortGarageByIdGarage getPortGarageByIdGarage 