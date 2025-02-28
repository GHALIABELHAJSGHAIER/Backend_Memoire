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
router.get("/getNotificationByUser", requireAuthUser ,notification.getNotificationByUser);
router.get("/getNotificationByIdNotification/:idNotif", notification.getNotificationByIdNotification);
router.put("/updateNotification/:id", notification.updateNotification);
router.delete("/deleteNotification/:id", notification.deleteNotification);
router.put("/markNotificationAsRead/:id", notification.markNotificationAsRead);
router.put('/markNotificationAsvu/:id', notification.markNotificationAsvu);

module.exports = router;
