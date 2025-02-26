const User = require('../models/userSchema.js');
const Notification = require('../models/notificationSchema');
const io = require('../socket/socket.js');

// Créer une nouvelle notification
module.exports.createNotification = async (req, res) => {
  try {
    const { clientId, content, type, url } = req.body;

    // Vérifie que le clientId existe
    const user = await User.findById(clientId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Créer une nouvelle notification avec le clientId
    const notification = new Notification({
      client: clientId, // Référence à l'utilisateur
      content,
      type,
      url
    });

    // Sauvegarder la notification dans la base de données
    const newNotification = await notification.save();

    // Ajouter la notification à l'utilisateur correspondant
    await User.updateOne({ _id: clientId }, { $push: { notifications: newNotification._id } });

    // Émettre un événement Socket.IO pour informer les clients connectés de la nouvelle notification
    //io.emit('newNotification', newNotification);

    // Répondre avec la notification créée
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*module.exports.addNotification = async (recipient, content, type ,url, req, res) => {
  try {

    const notification = new Notification({ recipient, content, type ,url });
    const newNotification = await notification.save();

    // Émettre un événement Socket.IO pour informer les clients connectés de la nouvelle notification
    // io.emit('newNotification', newNotification);

    // Ajouter la notification à l'utilisateur correspondant
    await User.updateOne({ _id: recipient }, { $push: { notifications: newNotification._id } });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/

// Récupérer toutes les notifications d'un utilisateur triées par date la plus récente
module.exports.getNotificationByUser = async (req, res) => {
  try {
    //const userId = req.session.user._id;
        const { clientId} = req.body;

    const notifications = await Notification.find({ client: userId })
    .sort({ createdAt: -1 }); // Trie par date de création décroissante (plus récente en premier)
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une notification par son ID
module.exports.getNotificationById = async (req, res) => {
    try {
      const notification = await Notification.findById(req.params.id).populate('client');  // Correction ici
      if (!notification) {
        return res.status(404).json({ message: "Notification introuvable" });
      }
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Mettre à jour une notification
module.exports.updateNotification = async (req, res) => {
  try {
    const { content, type } = req.body;
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification introuvable" });
    }
    notification.content = content;
    notification.type = type;
    const updatedNotification = await notification.save();
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une notification
module.exports.deleteNotification = async (req, res) => {
  try {
    // Trouver la notification à supprimer
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification introuvable" });
    }

    const user = await User.findByIdAndUpdate(
      notification.recipient,
      { $pull: { notifications: notification._id } },
      { new: true }
    );

    // Supprimer la notification
    await Notification.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Notification supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate('client').sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Marquer une notification comme lue
module.exports.markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);

    // Vérifiez si la notification existe
    if (!notification) {
      return res.status(404).json({ message: "Notification introuvable" });
    }

    // Marquez la notification comme lue
    notification.read = true;
    await notification.save();

    res.status(200).json({ message: "Notification marquée comme lue avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.markNotificationAsvu= async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { vu: true }, { new: true });
    if (!notification) {
      return res.status(404).json({ message: "Notification introuvable" });
    }
    res.status(200).json({ message: "Notification marquée comme lue avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};