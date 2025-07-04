const Maison = require('../models/maisonSchema');
const Garage = require("../models/garageSchema");
const mongoose = require("mongoose");
const HistoriqueGarage = require('../models/historiqueGarageSchema');

// ✅ Créer un nouveau garage
module.exports.createGarage = async (req, res, next) => {
  try {
    const { portGarage, maison } = req.body;

    if (typeof portGarage !== 'boolean') {
      return res.status(400).json({ success: false, error: "portGarage doit être un booléen" });
    }

    if (!mongoose.Types.ObjectId.isValid(maison)) {
      return res.status(400).json({ success: false, error: "Format d'ID maison invalide" });
    }

    const maisonExists = await Maison.findById(maison);
    if (!maisonExists) {
      return res.status(404).json({ success: false, error: "Maison introuvable" });
    }

    const newGarage = await Garage.create({ portGarage, maison });
    return res.status(201).json({ success: true, data: newGarage });

  } catch (err) {
    console.error("Erreur dans createGarage:", err);
    next(err);
  }
};

// ✅ Obtenir tous les garages liés à une maison (pour l'app)
module.exports.getPortGarageByIdMaison = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Format d'ID maison invalide" });
    }

    const garages = await Garage.find({ maison: id }).populate("maison");

    if (!garages || garages.length === 0) {
      return res.status(404).json({ status: false, message: "Aucun garage trouvé pour cette maison" });
    }

    return res.status(200).json({ status: true, success: garages });

  } catch (error) {
    console.log("Erreur dans getPortGarageByIdMaison:", error);
    next(error);
  }
};

// ✅ Mettre à jour portGarage et ajouter à l'historique (pour l'app)
module.exports.updatePortGarageByIdGarage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { portGarage } = req.body;

    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Format d'ID Garage invalide" });
    }

    if (typeof portGarage !== "boolean") {
      return res.status(400).json({ status: false, message: "portGarage doit être un booléen" });
    }

    const updatedGarage = await Garage.findByIdAndUpdate(
      id,
      { $set: { portGarage } },
      { new: true, runValidators: true }
    );

    if (!updatedGarage) {
      return res.status(404).json({ status: false, message: "Garage introuvable" });
    }

    // Ajouter à l'historique
    await HistoriqueGarage.create({
      garage: updatedGarage._id,
      etat: portGarage,
    });

    return res.status(200).json({ status: true, success: updatedGarage });

  } catch (error) {
    console.log("Erreur dans updatePortGarageByIdGarage:", error);
    next(error);
  }
};

// ✅ Lire le portGarage d'un garage spécifique (pour l’ESP32)
module.exports.getPortGarageByIdGarage = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Format d'ID Garage invalide" });
    }

    const garage = await Garage.findById(id).select("portGarage");

    if (!garage) {
      return res.status(404).json({ status: false, message: "Garage introuvable" });
    }

    return res.status(200).json({
      status: true,
      success: {
        _id: id,
        portGarage: garage.portGarage
      }
    });

  } catch (error) {
    console.error("Erreur dans getPortGarageByIdGarage:", error);
    return res.status(500).json({ status: false, message: "Erreur serveur" });
  }
};

//getHistoriqueByGarageId
module.exports.getHistoriqueByGarageId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "ID invalide" });
    }

    const { page = 1, limit = 10 } = req.query;
    const historique = await HistoriqueGarage.find({ garage: id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('garage', 'maison ')
      .lean(); // Convertit les documents Mongoose en objets JS simples

    if (!historique.length) {
      return res.status(404).json({ status: false, message: "Aucun historique trouvé" });
    }

    // Convertir les dates UTC en heure locale (Tunisie UTC+1)
    const historiqueWithLocalTime = historique.map(item => {
      const utcDate = new Date(item.date);
      // Pour la Tunisie (UTC+1), ajoutez 1 heure
      const localDate = new Date(utcDate.getTime() + 60 * 60 * 1000);
      
      return {
        ...item,
        date: localDate.toISOString(), // Ou formatez comme vous voulez
        localTime: localDate.toLocaleTimeString('fr-TN') // Format tunisien
      };
    });

    return res.status(200).json({ 
      status: true, 
      historique: historiqueWithLocalTime 
    });
  } catch (error) {
    console.log("Erreur dans getHistoriqueByGarageId:", error);
    next(error);
  }
};
module.exports.deleteHistoriqueById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Vérifier que l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "ID historique invalide" });
    }

    // Essayer de supprimer l'historique par son ID
    const deletedHistorique = await HistoriqueGarage.findByIdAndDelete(id);

    if (!deletedHistorique) {
      return res.status(404).json({ status: false, message: "Historique non trouvé" });
    }

    return res.status(200).json({ status: true, message: "Historique supprimé avec succès" });
  } catch (error) {
    console.error("Erreur dans deleteHistoriqueById :", error);
    next(error);
  }
};

