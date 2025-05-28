const mongoose = require('mongoose');
const Notification = require('../models/notificationSchema');

module.exports.getNotificationsByAlarmeId = async (req, res, next) => {
  try {
    const { alarmeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(alarmeId)) {
      return res.status(400).json({ status: false, message: "Format d'ID alarme invalide" });
    }

    const notifications = await Notification.find({ alarme: alarmeId }).sort({ date: -1 });

    if (!notifications.length) {
      return res.status(404).json({ status: false, message: "Aucune notification trouvée pour cette alarme" });
    }

    return res.status(200).json({ status: true, data: notifications });

  } catch (error) {
    console.error("Erreur dans getNotificationsByAlarmeId:", error);
    next(error);
  }
};

module.exports.deleteNotificationById = async (req, res, next) => {
  try {
    const { idNotification } = req.params;

    if (!mongoose.Types.ObjectId.isValid(idNotification)) {
      return res.status(400).json({ status: false, message: "Format d'ID notification invalide" });
    }

    const deletedNotification = await Notification.findByIdAndDelete(idNotification);

    if (!deletedNotification) {
      return res.status(404).json({ status: false, message: "Notification non trouvée" });
    }

    return res.status(200).json({ status: true, message: "Notification supprimée avec succès" });

  } catch (error) {
    console.error("Erreur dans deleteNotificationById:", error);
    next(error);
  }
};
