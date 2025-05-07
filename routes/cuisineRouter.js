const express = require("express");
const router = express.Router();
const cuisineController = require("../controllers/cuisineControllers");

// Routes pour les cuisine
// router.post("/createCuisine", cuisineController.createCuisine);
 //router.get("/getCuisineData", cuisineController.getCuisineData);
 //router.put('/updateCuisine/:id', cuisineController.updateCuisine); 
 router.get("/getCuisineById/:id", cuisineController.getCuisineById);
 
 router.put("/updateRelay/:id", cuisineController.updateRelayById);
 //router.get("/getRelay/:id", cuisineController.getRelayById);


// router.get("/getAllEspacesByIdMaison/:maisonId", espaceController.getAllEspacesByIdMaison);
// router.delete("/deleteEspaceById/:id", espaceController.deleteEspaceById);
// router.put('/updateEspace/:id', espaceController.updateEspace); 


// router.get("/getAllEspaces", espaceController.getAllEspaces);

// router.get('/getEspacesById/:id', espaceController.getEspacesById); 
 

module.exports = router;
 