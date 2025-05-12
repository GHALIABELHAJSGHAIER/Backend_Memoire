const User = require('../models/userSchema');
const Garage = require("../models/garageSchema");
const mongoose = require("mongoose");
const HistoriqueGarage = require('../models/historiqueGarageSchema'); // N'oublie pas d'importer


 
module.exports.createGarage = async (req, res, next) => {
  try {
    const { portGarage, client } = req.body;

    // Validation des champs
    if (typeof portGarage !== 'boolean') {
      return res.status(400).json({ success: false, error: "portGarage doit être un booléen" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(client)) {
      return res.status(400).json({ success: false, error: "Format d'ID client invalide" });
    }

    // Optionnel : vérifier l'existence de l'client
    const userExists = await User.findById(client);
    if (!userExists) {
      return res.status(404).json({ success: false, error: "user introuvable" });
    }

    // Création de la Garage
    const newGarage = await Garage.create({ portGarage, client });
    return res.status(201).json({ success: true, data: newGarage });
  } catch (err) {
    console.error("Erreur dans createGarage :", err);
    next(err);
  }
};
// hethi bech nista3milha f app
module.exports.getPortGarageByIdClient = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Vérifier si l'ID est valide (ObjectId MongoDB)
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid user ID format" });
    }

    // Trouver toutes les garages qui appartiennent à un client spécifique
    const garages = await Garage.find({ client: id }).populate("client");

    if (!garages || garages.length === 0) {
      return res.status(404).json({ status: false, message: "No garages found for this client" });
    }

    return res.status(200).json({ status: true, success: garages });
  } catch (error) {
    console.log("Erreur dans getPortGarageByIdClient:", error);
    next(error);
  }
};
//updatePortGarageByIdGarage  
// hethi bech nista3milha f app
// module.exports.updatePortGarageByIdGarage = async (req, res, next) => { 
//   try {
//     const { id } = req.params;
//     const { portGarage } = req.body;

//     // Vérifier l'ID
//     if (!id || id.length !== 24) {
//       return res.status(400).json({ status: false, message: "Invalid Garage ID format" });
//     }

//     // Vérifier si portGarage est bien fourni
//     if (typeof portGarage !== "boolean") {
//       return res.status(400).json({ status: false, message: "portGarage must be a boolean value" });
//     }

//     // Mettre à jour uniquement portGarage
//     const updatedGarage = await Garage.findByIdAndUpdate(
//       id,
//       { $set: { portGarage } },
//       { new: true, runValidators: true }
//     );

//     if (!updatedGarage) {
//       return res.status(404).json({ status: false, message: "Garage not found" });
//     }

//     return res.status(200).json({ status: true, success: updatedGarage });
//   } catch (error) {
//     console.log("Erreur dans updatePortGarageById:", error);
//     next(error);
//   }
// };

 module.exports.updatePortGarageByIdGarage = async (req, res, next) => { 
  try {
    const { id } = req.params;
    const { portGarage } = req.body;

    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid Garage ID format" });
    }

    if (typeof portGarage !== "boolean") {
      return res.status(400).json({ status: false, message: "portGarage must be a boolean value" });
    }

    const updatedGarage = await Garage.findByIdAndUpdate(
      id,
      { $set: { portGarage } },
      { new: true, runValidators: true }
    );

    if (!updatedGarage) {
      return res.status(404).json({ status: false, message: "Garage not found" });
    }

    
    await HistoriqueGarage.create({
      garage: updatedGarage._id,
      etat: portGarage,
    });

    return res.status(200).json({ status: true, success: updatedGarage });
  } catch (error) {
    console.log("Erreur dans updatePortGarageById:", error);
    next(error);
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
  .limit(parseInt(limit)) // du plus récent au plus ancien
      .populate('garage', 'client');

    if (!historique.length) {
      return res.status(404).json({ status: false, message: "Aucun historique trouvé" });
    }

    return res.status(200).json({ status: true, historique });
  } catch (error) {
    console.log("Erreur dans getHistoriqueByGarageId:", error);
    next(error);
  }
};

// hethi lil 5idma mta3 esp bech nista3milha f esp32
  module.exports.getPortGarageByIdGarage = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Vérifier l'ID
      if (!id || id.length !== 24) {
        return res.status(400).json({ status: false, message: "Invalid Garage ID format" });
      }
  
      // Rechercher la Garage et ne sélectionner que le champ portGarage
      const garage = await Garage.findById(id).select("portGarage");
  
      if (!garage) {
        return res.status(404).json({ status: false, message: "garage not found" });
      }
  
      return res.status(200).json({ status: true, portGarage: garage.portGarage });
    } catch (error) {
      console.log("Erreur dans getPortGarageByIdGarage:", error);
      next(error);
    }

  };


