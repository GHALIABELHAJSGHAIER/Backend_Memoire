const Espace = require("../models/espaceSchema");
const Salon = require("../models/salonSchema");
const mongoose = require("mongoose");

module.exports.createSalon = async (req, res, next) => {
    try {
        //humidity  temperature       relayClim
        const { relayOpenWindow , relayCloseWindow, relayClim, temperature, humidity, espace } = req.body;

        // Validation des champs
        if (typeof relayOpenWindow !== 'boolean') {
            return res.status(400).json({ success: false, error: "relayOpenWindow doit être un booléen" });
        }
        
        if (typeof relayCloseWindow !== 'boolean') {
            return res.status(400).json({ success: false, error: "relayCloseWindow doit être un booléen" });
        }
        if (typeof relayClim !== 'boolean') {
            return res.status(400).json({ success: false, error: "relayClim doit être un booléen" });
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
        const newSalon = await Salon.create({ relayOpenWindow , relayCloseWindow, relayClim, temperature, humidity, espace });
        return res.status(201).json({ success: true, data: newSalon });
    } catch (err) {
        console.error("Erreur dans createWc :", err);
        next(err);
    }

};
//getSalonByIdEspace
// hethi bech nista3milha f app
module.exports.getSalonByIdEspace = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Vérifier si l'ID est valide (ObjectId MongoDB)
        if (!id || id.length !== 24) {
            return res.status(400).json({ status: false, message: "Invalid espace ID format" });
        }

        // Trouver toutes les salons qui appartiennent à un espace spécifique
        const salons = await Salon.find({ espace: id }).populate("espace");

        if (!salons || salons.length === 0) {
            return res.status(404).json({ status: false, message: "No salons found for this espace" });
        }

        return res.status(200).json({ status: true, success: salons  });
    } catch (error) {
        console.log("Erreur dans getSalonByIdEspace:", error);
        next(error);
    }
};

//updateRelayByIdWc  
// hethi bech nista3milha f app
module.exports.updateRelayByIdSalon = async (req, res, next) => { 
  try {
    const { id } = req.params;
    const { relayOpenWindow ,relayCloseWindow, relayClim} = req.body;

    // Vérifier l'ID
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid salon ID format" });
    }

    // Vérifier si   est bien fourni
    if (typeof relayCloseWindow !== "boolean") {
      return res.status(400).json({ status: false, message: "relayCloseWindow must be a boolean value" });
    }
    if (typeof relayOpenWindow !== "boolean") {
      return res.status(400).json({ status: false, message: "relayOpenWindow must be a boolean value" });
    }
    if (typeof relayClim !== "boolean") {
      return res.status(400).json({ status: false, message: "relayClim must be a boolean value" });
    }

    // Mettre à jour uniquement  
    const updatedSalon = await Salon.findByIdAndUpdate(
      id,
      { $set: { relayOpenWindow, relayCloseWindow , relayClim } },
      { new: true, runValidators: true }
    );

    if (!updatedSalon) {
      return res.status(404).json({ status: false, message: "Salon not found" });
    }

    return res.status(200).json({ status: true, success: updatedSalon });
  } catch (error) {
    console.log("Erreur dans updateRelayByIdSalon:", error);
    next(error);
  }
};
// hethi lil 5idma mta3 esp bech nista3milha f esp32
module.exports.updateSalonByIdSalon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { relayOpenWindow,relayCloseWindow, relayClim, temperature, humidity } = req.body;

    // Vérifier si l'ID est valide (ex: ObjectId MongoDB)
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid space ID format" });
    }

    // Vérifier que des données sont envoyées
    if (!relayOpenWindow & !relayCloseWindow & !relayClim & !temperature& !humidity) {
      return res.status(400).json({ status: false, message: "No data provided for update" });
    }

    // Trouver et mettre à jour l'espace
    const updateSalonByIdSalon = await Salon.findByIdAndUpdate(
      id,
      { $set: { relayOpenWindow , relayCloseWindow, relayClim, temperature, humidity } },
      { new: true, runValidators: true } // Retourne l'espace mis à jour avec validation du schéma
    );

    if (!updateSalonByIdSalon) {
      return res.status(404).json({ status: false, message: "Salon not found" });
    }

    return res.status(200).json({ status: true, success: updateSalonByIdSalon });
  } catch (error) {
    next(error); // Laisse Express gérer les erreurs avec un middleware global
  }
};

// hethi lil 5idma mta3 esp bech nista3milha f esp32
  module.exports.getRelayByIdSalon = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Vérifier l'ID
      if (!id || id.length !== 24) {
        return res.status(400).json({ status: false, message: "Invalid salon ID format" });
      }
  
      // Rechercher la salon et ne sélectionner que le champ relayClim
      const salon = await Salon.findById(id).select("relayClim & relayOpenWindow & relayCloseWindow");
       
  
      if (!salon) {
        return res.status(404).json({ status: false, message: "Cuisine not found" });
      }
  
      return res.status(200).json({ status: true, relayOpenWindow: salon.relayOpenWindow, relayCloseWindow: salon.relayCloseWindow , relayClim: salon.relayClim });
    } catch (error) {
      console.log("Erreur dans getRelayByIdSalon:", error);
      next(error);
    }
  };


