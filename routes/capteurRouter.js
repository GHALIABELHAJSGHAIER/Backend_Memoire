const express = require("express");
const router = express.Router();
const capteurController = require("../controllers/capteurControllers");

// Routes CRUD pour les appareils
router.post('/addCapteurByIdEspace/:espaceId', capteurController.addCapteurByIdEspace);  
router.post('/detecterFuiteGaz', capteurController.detecterFuiteGaz);  
router.get('/getAllCapteur', capteurController.getAllCapteur);  
router.get('/getAllCapteurType/:type', capteurController.getAllCapteurType);  
router.get('/getCapteurCountByType/:type', capteurController.getCapteurCountByType);  
router.put('/updateCapteur/:id', capteurController.updateCapteur);  
router.delete('/deleteCapteurById/:id', capteurController.deleteCapteurById);  
router.post('/detecterMouvement', capteurController.detecterMouvement);  


 

module.exports = router;
