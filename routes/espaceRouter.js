const express = require("express");
const router = express.Router();
const espaceController = require("../controllers/espaceControllers");

// Routes pour les espaces
router.post("/addEspaceForMaison", espaceController.addEspaceForMaison);
router.get("/getAllEspacesByIdMaison/:maisonId", espaceController.getAllEspacesByIdMaison);
router.delete("/deleteEspaceById/:id", espaceController.deleteEspaceById);
router.put('/updateEspace/:id', espaceController.updateEspace); 


router.get("/getAllEspaces", espaceController.getAllEspaces);

router.get('/getEspacesById/:id', espaceController.getEspacesById); 

//router.delete("/supprimer/:id", espaceController.supprimerEspace);
//router.get("/", espaceController.getEspaces);

module.exports = router;
/**const express = require("express");
const router = express.Router();
const espaceController = require("../controllers/espaceController");

// Vérifie bien la syntaxe de ta route
router.post("/addMaisonForClient", espaceController.addMaisonForClient);

module.exports = router;
 */