const Espace = require("../models/espaceSchema");
const Cuisine = require("../models/cuisineSchema");
const mongoose = require("mongoose");

/////////////



module.exports.createCuisine = async (req, res, next) => {
  try {
    const { relayInc, flamme, gaz, espace } = req.body;

    // Validation des champs
    if (typeof relayInc !== 'boolean') {
      return res.status(400).json({ success: false, error: "relayInc doit être un booléen" });
    }
    if (typeof flamme !== 'number' || isNaN(flamme)) {
      return res.status(400).json({ success: false, error: "flamme doit être un nombre" });
    }
    if (typeof gaz !== 'number' || isNaN(gaz)) {
      return res.status(400).json({ success: false, error: "gaz doit être un nombre" });
    }
    if (!mongoose.Types.ObjectId.isValid(espace)) {
      return res.status(400).json({ success: false, error: "Format d'ID Espace invalide" });
    }

    // Optionnel : vérifier l'existence de l'Espace
    const espaceExists = await Espace.findById(espace);
    if (!espaceExists) {
      return res.status(404).json({ success: false, error: "Espace introuvable" });
    }

    // Création de la cuisine
    const newCuisine = await Cuisine.create({ relayInc, flamme, gaz, espace });
    return res.status(201).json({ success: true, data: newCuisine });
  } catch (err) {
    console.error("Erreur dans createCuisine :", err);
    next(err);
  }
};

//getCuisineByIdEspace
// hethi bech nista3milha f app
module.exports.getCuisineByIdEspace = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Vérifier si l'ID est valide (ObjectId MongoDB)
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid espace ID format" });
    }

    // Trouver toutes les cuisines qui appartiennent à un espace spécifique
    const cuisines = await Cuisine.find({ espace: id }).populate("espace");

    if (!cuisines || cuisines.length === 0) {
      return res.status(404).json({ status: false, message: "No cuisines found for this espace" });
    }

    return res.status(200).json({ status: true, success: cuisines });
  } catch (error) {
    console.log("Erreur dans getCuisineByIdEspace:", error);
    next(error);
  }
};
//updateRelayByIdCuisine  
// hethi bech nista3milha f app
module.exports.updateRelayByIdCuisine = async (req, res, next) => { 
  try {
    const { id } = req.params;
    const { relayInc } = req.body;

    // Vérifier l'ID
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid cuisine ID format" });
    }

    // Vérifier si relayInc est bien fourni
    if (typeof relayInc !== "boolean") {
      return res.status(400).json({ status: false, message: "relayInc must be a boolean value" });
    }

    // Mettre à jour uniquement relayInc
    const updatedCuisine = await Cuisine.findByIdAndUpdate(
      id,
      { $set: { relayInc } },
      { new: true, runValidators: true }
    );

    if (!updatedCuisine) {
      return res.status(404).json({ status: false, message: "Cuisine not found" });
    }

    return res.status(200).json({ status: true, success: updatedCuisine });
  } catch (error) {
    console.log("Erreur dans updateRelayById:", error);
    next(error);
  }
};


// hethi lil 5idma mta3 esp bech nista3milha f esp32
module.exports.updateCuisineByIdCuisine = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { relayInc, flamme, gaz } = req.body;

    // Vérifier si l'ID est valide (ex: ObjectId MongoDB)
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid space ID format" });
    }

    // Vérifier que des données sont envoyées
    if (!relayInc & !flamme & !gaz) {
      return res.status(400).json({ status: false, message: "No data provided for update" });
    }

    // Trouver et mettre à jour l'espace
    const updateCuisineByIdCuisine = await Cuisine.findByIdAndUpdate(
      id,
      { $set: { relayInc, flamme, gaz } },
      { new: true, runValidators: true } // Retourne l'espace mis à jour avec validation du schéma
    );

    if (!updateCuisineByIdCuisine) {
      return res.status(404).json({ status: false, message: "Cuisine not found" });
    }

    return res.status(200).json({ status: true, success: updateCuisineByIdCuisine });
  } catch (error) {
    next(error); // Laisse Express gérer les erreurs avec un middleware global
  }
};
// hethi lil 5idma mta3 esp bech nista3milha f esp32
  module.exports.getRelayByIdCuisine = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Vérifier l'ID
      if (!id || id.length !== 24) {
        return res.status(400).json({ status: false, message: "Invalid cuisine ID format" });
      }
  
      // Rechercher la cuisine et ne sélectionner que le champ relayInc
      const cuisine = await Cuisine.findById(id).select("relayInc");
  
      if (!cuisine) {
        return res.status(404).json({ status: false, message: "Cuisine not found" });
      }
  
      return res.status(200).json({ status: true, relayInc: cuisine.relayInc });
    } catch (error) {
      console.log("Erreur dans getRelayByIdCuisine:", error);
      next(error);
    }
  };


