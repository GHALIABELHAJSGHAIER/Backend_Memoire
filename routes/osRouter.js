var express = require('express');
var router = express.Router();

// BECH NORBOUT  bin osRouter w osController 

const osController = require('../controllers/osControllers');
/* GET home page. */

//ki nji lina nwali les methode ili f controller yatl3ouli
router.get('/getOsInformation', osController.getOsInformation);
//router.get('/esmfonction', osController.esmfonction);

module.exports = router;
