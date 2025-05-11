const User = require('../models/userSchema');
const Garage = require("../models/garageSchema");
const mongoose = require("mongoose");

 
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

    // Optionnel : vérifier l'existence de l'Espace
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
 
//updatePortGarageByIdGarage  
// hethi bech nista3milha f app
module.exports.updatePortGarageByIdGarage = async (req, res, next) => { 
  try {
    const { id } = req.params;
    const { portGarage } = req.body;

    // Vérifier l'ID
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid Garage ID format" });
    }

    // Vérifier si portGarage est bien fourni
    if (typeof portGarage !== "boolean") {
      return res.status(400).json({ status: false, message: "portGarage must be a boolean value" });
    }

    // Mettre à jour uniquement portGarage
    const updatedGarage = await Garage.findByIdAndUpdate(
      id,
      { $set: { portGarage } },
      { new: true, runValidators: true }
    );

    if (!updatedGarage) {
      return res.status(404).json({ status: false, message: "Garage not found" });
    }

    return res.status(200).json({ status: true, success: updatedGarage });
  } catch (error) {
    console.log("Erreur dans updatePortGarageById:", error);
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


