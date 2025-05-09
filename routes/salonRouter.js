const express = require("express");
const router = express.Router();
const salonController = require("../controllers/salonControllers");


router.post("/createSalon", salonController.createSalon);
router.get("/getSalonByIdEspace/:id", salonController.getSalonByIdEspace);
router.put("/updateRelayByIdSalon/:id", salonController.updateRelayByIdSalon);
 router.put("/updateSalonByIdSalon/:id", salonController.updateSalonByIdSalon);
router.get("/getRelayByIdSalon/:id", salonController.getRelayByIdSalon);


module.exports = router;
