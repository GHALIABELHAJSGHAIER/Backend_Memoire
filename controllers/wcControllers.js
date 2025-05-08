const Espace = require("../models/espaceSchema");
const Wc = require("../models/wcSchema");
const mongoose = require("mongoose");

module.exports.createWc = async (req, res, next) => {
    try {
        const { relaySolarHeat, relayHeat, temperature, humidity, espace } = req.body;

        // Validation des champs
        if (typeof relaySolarHeat !== 'boolean') {
            return res.status(400).json({ success: false, error: "relaySolarHeat doit être un booléen" });
        }
        if (typeof relayHeat !== 'boolean') {
            return res.status(400).json({ success: false, error: "relayHeat doit être un booléen" });
        }
        if (typeof temperature !== 'number' || isNaN(temperature)) {
            return res.status(400).json({ success: false, error: "temperature doit être un nombre" });
        }
        if (typeof humidity !== 'number' || isNaN(humidity)) {
            return res.status(400).json({ success: false, error: "humidity doit être un nombre" });
        }
        if (!mongoose.Types.ObjectId.isValid(espace)) {
            return res.status(400).json({ success: false, error: "Format d'ID Espace invalide" });
        }

        // Optionnel : vérifier l'existence de l'Espace
        const espaceExists = await Espace.findById(espace);
        if (!espaceExists) {
            return res.status(404).json({ success: false, error: "Espace introuvable" });
        }

        // Création de la wc
        const newWc = await Wc.create({ relaySolarHeat, relayHeat, temperature, humidity, espace });
        return res.status(201).json({ success: true, data: newWc });
    } catch (err) {
        console.error("Erreur dans createWc :", err);
        next(err);
    }

};
//getWcByIdEspace
// hethi bech nista3milha f app
module.exports.getWcByIdEspace = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Vérifier si l'ID est valide (ObjectId MongoDB)
        if (!id || id.length !== 24) {
            return res.status(400).json({ status: false, message: "Invalid espace ID format" });
        }

        // Trouver toutes les wcs qui appartiennent à un espace spécifique
        const wcs = await Wc.find({ espace: id }).populate("espace");

        if (!wcs || wcs.length === 0) {
            return res.status(404).json({ status: false, message: "No wcs found for this espace" });
        }

        return res.status(200).json({ status: true, success: wcs });
    } catch (error) {
        console.log("Erreur dans getWcByIdEspace:", error);
        next(error);
    }
};

//updateRelayByIdWc  
// hethi bech nista3milha f app
module.exports.updateRelayByIdWc = async (req, res, next) => { 
  try {
    const { id } = req.params;
    const { relaySolarHeat , relayHeat} = req.body;

    // Vérifier l'ID
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid wc ID format" });
    }

    // Vérifier si relaySolarHeat est bien fourni
    if (typeof relaySolarHeat !== "boolean") {
      return res.status(400).json({ status: false, message: "relaySolarHeat must be a boolean value" });
    }
    if (typeof relayHeat !== "boolean") {
      return res.status(400).json({ status: false, message: "relayHeat must be a boolean value" });
    }

    // Mettre à jour uniquement relaySolarHeat
    const updatedWc = await Wc.findByIdAndUpdate(
      id,
      { $set: { relaySolarHeat, relayHeat } },
      { new: true, runValidators: true }
    );

    if (!updatedWc) {
      return res.status(404).json({ status: false, message: "Wc not found" });
    }

    return res.status(200).json({ status: true, success: updatedWc });
  } catch (error) {
    console.log("Erreur dans updateRelayByIdWc:", error);
    next(error);
  }
};
