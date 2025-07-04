const Espace = require("../models/espaceSchema");
const Chambre = require("../models/chambreSchema");
const mongoose = require("mongoose");

// Create Chambre
module.exports.createChambre = async (req, res, next) => {
  try {
    const {
      relayClimChambre,
      relayLamp,
      relayOpenWindow,
      relayCloseWindow,
      tempChambre,
      humChambre,
      espace
    } = req.body;

    // Validation
    if (
      typeof relayClimChambre !== 'boolean' ||
      typeof relayLamp !== 'boolean' ||
      typeof relayOpenWindow !== 'boolean' ||
      typeof relayCloseWindow !== 'boolean'
    ) {
      return res.status(400).json({ success: false, error: "Les relais doivent être des booléens." });
    }

    if (typeof tempChambre !== 'number' || isNaN(tempChambre)) {
      return res.status(400).json({ success: false, error: "La température doit être un nombre." });
    }

    if (typeof humChambre !== 'number' || isNaN(humChambre)) {
      return res.status(400).json({ success: false, error: "L'humidité doit être un nombre." });
    }

    if (!mongoose.Types.ObjectId.isValid(espace)) {
      return res.status(400).json({ success: false, error: "ID espace invalide." });
    }

    const espaceExists = await Espace.findById(espace);
    if (!espaceExists) {
      return res.status(404).json({ success: false, error: "Espace non trouvé." });
    }

    const newChambre = await Chambre.create({
      relayClimChambre,
      relayLamp,
      relayOpenWindow,
      relayCloseWindow,
      tempChambre,
      humChambre,
      espace
    });

    return res.status(201).json({ success: true, data: newChambre });
  } catch (err) {
    console.error("Erreur dans createChambre :", err);
    next(err);
  }
};

// Get Chambres by espace ID
module.exports.getChambreByIdEspace = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "ID espace invalide." });
    }

    const chambres = await Chambre.find({ espace: id }).populate("espace");

    if (!chambres.length) {
      return res.status(404).json({ status: false, message: "Aucune chambre trouvée pour cet espace." });
    }

    return res.status(200).json({ status: true, success: chambres });
  } catch (error) {
    console.log("Erreur dans getChambreByIdEspace:", error);
    next(error);
  }
};
module.exports.updateChambreByIdChambre = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      relayOpenWindow,
      relayCloseWindow,
      relayClimChambre,
      relayLamp,
      tempChambre,
      humChambre
    } = req.body;

    // Vérifier si l'ID est valide (ex: ObjectId MongoDB)
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid chambre ID format" });
    }

    // Vérifier que des données sont envoyées
    if (
      relayOpenWindow === undefined &&
      relayCloseWindow === undefined &&
      relayClimChambre === undefined &&
      relayLamp === undefined &&
      tempChambre === undefined &&
      humChambre === undefined
    ) {
      return res.status(400).json({ status: false, message: "No data provided for update" });
    }

    // Construction dynamique de l'objet à mettre à jour
    const updateFields = {};
    if (relayOpenWindow !== undefined) updateFields.relayOpenWindow = relayOpenWindow;
    if (relayCloseWindow !== undefined) updateFields.relayCloseWindow = relayCloseWindow;
    if (relayClimChambre !== undefined) updateFields.relayClimChambre = relayClimChambre;
    if (relayLamp !== undefined) updateFields.relayLamp = relayLamp;
    if (tempChambre !== undefined) updateFields.tempChambre = tempChambre;
    if (humChambre !== undefined) updateFields.humChambre = humChambre;

    // Mise à jour de la chambre
    const updatedChambre = await Chambre.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedChambre) {
      return res.status(404).json({ status: false, message: "Chambre not found" });
    }

    return res.status(200).json({ status: true, success: updatedChambre });
  } catch (error) {
    console.error("Erreur dans updateChambreByIdChambre:", error);
    next(error);
  }
};

// Update relay by chambre ID
module.exports.updateRelayByIdChambre = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      relayClimChambre,
      relayLamp,
      relayOpenWindow,
      relayCloseWindow
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "ID chambre invalide." });
    }

    const updatedChambre = await Chambre.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(relayClimChambre !== undefined && { relayClimChambre }),
          ...(relayLamp !== undefined && { relayLamp }),
          ...(relayOpenWindow !== undefined && { relayOpenWindow }),
          ...(relayCloseWindow !== undefined && { relayCloseWindow })
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedChambre) {
      return res.status(404).json({ status: false, message: "Chambre non trouvée." });
    }

    return res.status(200).json({ status: true, success: updatedChambre });
  } catch (error) {
    console.log("Erreur dans updateRelayByIdChambre:", error);
    next(error);
  }
};

// Get relays only
module.exports.getRelayByIdChambre = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "ID chambre invalide." });
    }

    const chambre = await Chambre.findById(id).select("relayClimChambre relayLamp relayOpenWindow relayCloseWindow");

    if (!chambre) {
      return res.status(404).json({ status: false, message: "Chambre non trouvée." });
    }

    return res.status(200).json({ status: true, data: chambre });
  } catch (error) {
    console.log("Erreur dans getRelayByIdChambre:", error);
    next(error);
  }
};
