const User = require('../models/userSchema.js');
const Notification = require('../models/notificationSchema');


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
//getAllNotifications
module.exports.getAllNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find().populate('client').sort({ createdAt: -1 });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Récupérer toutes les notifications d'un utilisateur triées par date la plus récente
module.exports.getNotificationByUser = async (req, res) => {
    try {
      const userId = req.session.user._id; // Utilisateur connecté
      const { clientId } = req.body; // Récupère clientId depuis le body
  
      if (!clientId) {
        return res.status(400).json({ message: "ClientId est requis" });
      }
  
      const notifications = await Notification.find({ client: clientId})
      .sort({ createdAt: -1 });
  
      res.status(200).json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  
// Récupérer une notification par son ID
module.exports.getNotificationByIdNotification = async (req, res) => {
    try {
      const notification = await Notification.findById(req.params.idNotif).populate('client');  // Correction ici
      if (!notification) {
        return res.status(404).json({ message: "Notification introuvable" });
      }
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
//update
module.exports.updateNotification = async (req, res) => {
    try {
      const id = req.params.id; // Récupérer l'ID depuis les paramètres
      const { clientId, content, type, url } = req.body; // Récupérer les données depuis le body
  
      // Vérifier si la notification existe
      const notificationById = await Notification.findById(id);
      if (!notificationById) {
        return res.status(404).json({ message: "Notification introuvable" });
      }
  
      // Vérifier si au moins une donnée est fournie
      if (!clientId && !content && !type && !url) {
        return res.status(400).json({ message: "Erreur : aucune donnée à mettre à jour" });
      }
  
      // Mettre à jour la notification
      const updated = await Notification.findByIdAndUpdate(
        id,
        { $set: { client: clientId, content, type, url } },
        { new: true } // Pour retourner l'objet mis à jour
      );
  
      res.status(200).json({ updated });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  

// Supprimer une notification
module.exports.deleteNotification = async (req, res) => {
    try {
        const id = req.params.id;
    
        const notificationById = await Notification.findById(id);
    
        if (!notificationById || notificationById.length === 0) {
          throw new Error("Notification  introuvable");
        }
    
          
        await User.updateMany({}, {
            $pull: { notifications: id },
          });
    
        await Notification.findByIdAndDelete(id);
    
        res.status(200).json("deleted");
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