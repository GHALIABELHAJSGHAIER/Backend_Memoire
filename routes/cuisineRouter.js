const express = require("express");
const router = express.Router();
const cuisineController = require("../controllers/cuisineControllers");

// Routes pour les cuisine
 router.post("/createCuisine", cuisineController.createCuisine);
 router.get("/getCuisineByIdEspace/:id", cuisineController.getCuisineByIdEspace);
 router.put("/updateRelayByIdCuisine/:id", cuisineController.updateRelayByIdCuisine);
 router.put('/updateCuisineByIdCuisine/:id', cuisineController.updateCuisineByIdCuisine); 
 router.get("/getRelayByIdCuisine/:id", cuisineController.getRelayByIdCuisine);
 
module.exports = router;
 