const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  content: { type: String, required: true }, // Contenu de la notification
  type: { type: String }, // Type de notification (ex: info, alerte, message)
  url: { type: String }, // Lien associé à la notification (ex: page spécifique)
  read: { type: Boolean, default: false }, // Statut de lecture de la notification
  vu: { type: Boolean, default: false }, // Autre statut de visibilité
  createdAt: { type: Date, default: Date.now, index: true }, // Date de création (avec un index pour optimiser les requêtes)
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
