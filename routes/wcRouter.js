const express = require("express");
const router = express.Router();
const wcController = require("../controllers/wcControllers");


router.post("/createWc", wcController.createWc);
router.get("/getWcByIdEspace/:id", wcController.getWcByIdEspace);
router.put("/updateRelayByIdWc/:id", wcController.updateRelayByIdWc);
router.put("/updateWcByIdWc/:id", wcController.updateWcByIdWc);
router.get("/getRelayByIdWc/:id", wcController.getRelayByIdWc);


module.exports = router;
