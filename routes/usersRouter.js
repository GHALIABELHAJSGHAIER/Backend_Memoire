var express = require('express');
var router = express.Router();
const userController = require('../controllers/userControllers');
const {requireAuthUser} = require('../middlewares/authMiddlewares');
 
const upload = require('../middlewares/uploadFile');

/* GET users listing. */
router.post('/addUserClient',userController.addUserClient); 
router.post('/addUserAdmin',userController.addUserAdmin); 
router.post('/login',userController.login); 
router.post('/logout',userController.logout); 
router.get('/getAllUsers',userController.getAllUsers);  // sans authMiddlewares
//router.get('/getAllUsers',requireAuthUser,userController.getAllUsers);//avec authMiddlewares
router.get('/getUserById/:id',userController.getUserById); 
router.get('/searchUserByUsername',userController.searchUserByUsername); 
router.get('/getAllUsersAge/:age',userController.getAllUsersAge); 
router.get('/getAllUsersSortByAge',userController.getAllUsersSortByAge); 
router.get('/getAllClient',userController.getAllClient); 
router.get('/getAllAdmin',userController.getAllAdmin); 
router.get('/getAllUsersAgeBetMaxAgeMinAge',userController.getAllUsersAgeBetMaxAgeMinAge); 
router.put('/updateuserById/:id',userController.updateuserById); 
router.delete('/deleteUserById/:id',userController.deleteUserById); 


router.post('/addUserClientWithImg',upload.single("image_user"),userController.addUserClientWithImg); 

module.exports = router;