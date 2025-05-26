const Notification = require('../models/notificationSchema');

module.exports.getNotificationsByAlarmeId = async (req, res, next) => {
  try {
    const { alarmeId } = req.params;

    if (!alarmeId || alarmeId.length !== 24) {
      return res.status(400).json({ status: false, message: "Format d'ID alarme invalide" });
    }

    const notifications = await Notification.find({ alarme: alarmeId }).sort({ date: -1 });

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ status: false, message: "Aucune notification trouvée pour cette alarme" });
    }

    return res.status(200).json({ status: true, data: notifications });

  } catch (error) {
    console.error("Erreur dans getNotificationsByAlarmeId:", error);
    next(error);
  }
};
