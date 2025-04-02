var express = require('express');
var router = express.Router();
const maisonController = require('../controllers/maisonControllers');



router.post('/addMaison', maisonController.addMaison);

router.post('/addMaisonForClient', maisonController.addMaisonForClient); // Ajouter une maison pour un client
router.get('/getMaisonsByClientId/:clientId', maisonController.getMaisonsByClientId); // Obtenir toutes les maisons d'un client
router.delete('/deleteMaisonById/:id', maisonController.deleteMaisonById); 
router.get('/getAllMaison', maisonController.getAllMaison); 

router.get('/getMaisonById/:id', maisonController.getMaisonById); 

router.put('/updateMaison/:id', maisonController.updateMaison); 
router.put('/affect', maisonController.affect); 
router.put('/desaffect', maisonController.desaffect); 

module.exports = router;
