const express = require("express");
const router = express.Router();
const chambreController = require("../controllers/chambreControllers");


router.post("/createChambre", chambreController.createChambre);
router.get("/getChambreByIdEspace/:id", chambreController.getChambreByIdEspace);
router.put("/updateRelayByIdChambre/:id", chambreController.updateRelayByIdChambre);
router.put("/updateChambreByIdChambre/:id", chambreController.updateChambreByIdChambre);
router.get("/getRelayByIdChambre/:id", chambreController.getRelayByIdChambre);
//         

module.exports = router;
