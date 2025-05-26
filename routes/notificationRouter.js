const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationControllers');

router.get('/getNotificationsByAlarmeId/:alarmeId', notificationController.getNotificationsByAlarmeId);

module.exports = router;
