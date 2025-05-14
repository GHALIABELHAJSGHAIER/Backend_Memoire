const Espace = require("../models/espaceSchema");
const Wc = require("../models/wcSchema");
const mongoose = require("mongoose");

module.exports.createWc = async (req, res, next) => {
    try {
        const { relaySolarHeat, relayHeat, tempWC, humWC, espace } = req.body;

        // Validation des champs
        if (typeof relaySolarHeat !== 'boolean') {
            return res.status(400).json({ success: false, error: "relaySolarHeat doit être un booléen" });
        }
        if (typeof relayHeat !== 'boolean') {
            return res.status(400).json({ success: false, error: "relayHeat doit être un booléen" });
        }
        if (typeof tempWC !== 'number' || isNaN(tempWC)) {
            return res.status(400).json({ success: false, error: "tempWC doit être un nombre" });
        }
        if (typeof humWC !== 'number' || isNaN(humWC)) {
            return res.status(400).json({ success: false, error: "humWC doit être un nombre" });
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
        const newWc = await Wc.create({ relaySolarHeat, relayHeat, tempWC, humWC, espace });
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
// hethi lil 5idma mta3 esp bech nista3milha f esp32
module.exports.updateWcByIdWc = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { relaySolarHeat, relayHeat, tempWC, humWC } = req.body;

    // Vérifier si l'ID est valide (ex: ObjectId MongoDB)
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid space ID format" });
    }

    // Vérifier que des données sont envoyées
    if (!relaySolarHeat && !relayHeat && !tempWC && !humWC) {
      return res.status(400).json({ status: false, message: "No data provided for update" });
    }

    // Trouver et mettre à jour l'espace
    const updateWcByIdWc = await Wc.findByIdAndUpdate(
      id,
      { $set: { relaySolarHeat, relayHeat, tempWC, humWC } },
      { new: true, runValidators: true } // Retourne l'espace mis à jour avec validation du schéma
    );

    if (!updateWcByIdWc) {
      return res.status(404).json({ status: false, message: "Wc not found" });
    }

    return res.status(200).json({ status: true, success: updateWcByIdWc });
  } catch (error) {
    next(error); // Laisse Express gérer les erreurs avec un middleware global
  }
};

// hethi lil 5idma mta3 esp bech nista3milha f esp32
  // module.exports.getRelayByIdWc = async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  
  //     // Vérifier l'ID
  //     if (!id || id.length !== 24) {
  //       return res.status(400).json({ status: false, message: "Invalid Wc ID format" });
  //     }
  
  //     // Rechercher la Wc et ne sélectionner que le champ relayHeat
  //     const wc = await Wc.findById(id).select("relayHeat & relaySolarHeat");
       
  
  //     if (!wc) {
  //       return res.status(404).json({ status: false, message: "Cuisine not found" });
  //     }
  
  //     return res.status(200).json({ status: true, relaySolarHeat: wc.relaySolarHeat , relayHeat: wc.relayHeat });
  //   } catch (error) {
  //     console.log("Erreur dans getRelayByIdWc:", error);
  //     next(error);
  //   }
  // };


// Change getRelayByIdWc to use consistent response format
module.exports.getRelayByIdWc = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!id || id.length !== 24) {
            return res.status(400).json({ status: false, message: "Invalid Wc ID format" });
        }
        
        const wc = await Wc.findById(id).select("relayHeat relaySolarHeat");
        
        if (!wc) {
            return res.status(404).json({ status: false, message: "WC not found" });
        }
        
        return res.status(200).json({ 
            status: true, 
            data: {
                relaySolarHeat: wc.relaySolarHeat,
                relayHeat: wc.relayHeat
            }
        });
    } catch (error) {
        console.log("Erreur dans getRelayByIdWc:", error);
        next(error);
    }
};