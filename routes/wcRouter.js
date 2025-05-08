const express = require("express");
const router = express.Router();
const wcController = require("../controllers/wcControllers");

 
 router.post("/createWc", wcController.createWc);
  router.get("/getWcByIdEspace/:id", wcController.getWcByIdEspace);
router.put("/updateRelayByIdWc/:id", wcController.updateRelayByIdWc);
//  router.put("/updateRelayByIdCuisine/:id", wcController.updateRelayByIdCuisine);
//  router.put('/updateCuisineByIdCuisine/:id', wcController.updateCuisineByIdCuisine); 
//  router.get("/getRelayByIdCuisine/:id", wcController.getRelayByIdCuisine);
 
module.exports = router;
 