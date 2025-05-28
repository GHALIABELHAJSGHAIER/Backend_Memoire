const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationControllers');

router.get('/getNotificationsByAlarmeId/:alarmeId', notificationController.getNotificationsByAlarmeId);
router.delete('/deleteNotificationById/:idNotification', notificationController.deleteNotificationById);

module.exports = router;
