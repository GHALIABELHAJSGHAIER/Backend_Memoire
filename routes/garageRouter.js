const express = require("express");
const router = express.Router();
const garageController = require("../controllers/garageControllers");

// Routes pour les garage
 router.post("/createGarage", garageController.createGarage);
  router.put("/updatePortGarageByIdGarage/:id", garageController.updatePortGarageByIdGarage);
  router.get("/getPortGarageByIdGarage/:id", garageController.getPortGarageByIdGarage);
 
module.exports = router;
 // createGarage updatePortGarageByIdGarage getPortGarageByIdGarage 