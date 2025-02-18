var express = require('express');
var router = express.Router();
const maisonController = require('../controllers/maisonController');

router.post('/addMaisonForClient', maisonController.addMaisonForClient); // Ajouter une maison pour un client
router.get('/getMaisonsByClientId/:clientId', maisonController.getMaisonsByClientId); // Obtenir toutes les maisons d'un client
router.get('/getAllMaison', maisonController.getAllMaison); 
router.get('/getMaisonById/:id', maisonController.getMaisonById); 
router.delete('/deleteMaisonById/:id', maisonController.deleteMaisonById); 
router.put('/updateMaison/:id', maisonController.updateMaison); 

module.exports = router;
