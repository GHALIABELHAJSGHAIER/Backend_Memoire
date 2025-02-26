const express = require("express");
const router = express.Router();
const notification = require("../controllers/notificationControllers");
const { requireAuthUser } = require('../middlewares/authMiddlewares')

/*router.post("/", requireAuthUser, notification.createNotification);
router.get("/", requireAuthUser, notification.getAllNotifications);
router.get("/getNotificationByUser", requireAuthUser, notification.getUserNotifications);
router.get("/:id", requireAuthUser, notification.getNotificationById);
router.put("/:id", requireAuthUser, notification.updateNotification);
router.delete("/:id", requireAuthUser, notification.deleteNotification);
router.put("/:id/read", requireAuthUser, notification.markNotificationAsRead);
router.put('/:id/markAsRead', notification.markNotificationAsvu);*/
router.post("/createNotification",  notification.createNotification);
//router.post("/addNotification",  notification.addNotification);
router.get("/getAllNotifications",  notification.getAllNotifications);
//router.get("/getNotificationByUser", requireAuthUser, notification.getNotificationByUser);
router.get("/getNotificationByUser", notification.getNotificationByUser);
router.get("/getNotificationById/:id", notification.getNotificationById);
router.put("/:id", notification.updateNotification);
router.delete("/:id", notification.deleteNotification);
router.put("/:id/read", notification.markNotificationAsRead);
router.put('/:id/markAsRead', notification.markNotificationAsvu);

module.exports = router;
