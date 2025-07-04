const Espace = require("../models/espaceSchema");
const Salon = require("../models/salonSchema");
const mongoose = require("mongoose");

module.exports.createSalon = async (req, res, next) => {
    try {
        //humSalon  tempSalon       relayClimSalon
        const { relayOpenWindowSalon , relayCloseWindowSalon, relayClimSalon, tempSalon, humSalon, espace } = req.body;

        // Validation des champs
        if (typeof relayOpenWindowSalon !== 'boolean') {
            return res.status(400).json({ success: false, error: "relayOpenWindowSalon doit être un booléen" });
        }
        
        if (typeof relayCloseWindowSalon !== 'boolean') {
            return res.status(400).json({ success: false, error: "relayCloseWindowSalon doit être un booléen" });
        }
        if (typeof relayClimSalon !== 'boolean') {
            return res.status(400).json({ success: false, error: "relayClimSalon doit être un booléen" });
        }
        if (typeof tempSalon !== 'number' || isNaN(tempSalon)) {
            return res.status(400).json({ success: false, error: "tempSalon doit être un nombre" });
        }
        if (typeof humSalon !== 'number' || isNaN(humSalon)) {
            return res.status(400).json({ success: false, error: "humSalon doit être un nombre" });
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
        const newSalon = await Salon.create({ relayOpenWindowSalon , relayCloseWindowSalon, relayClimSalon, tempSalon, humSalon, espace });
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
    const { relayOpenWindowSalon ,relayCloseWindowSalon, relayClimSalon} = req.body;

    // Vérifier l'ID
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid salon ID format" });
    }

    // Vérifier si   est bien fourni
    if (typeof relayCloseWindowSalon !== "boolean") {
      return res.status(400).json({ status: false, message: "relayCloseWindowSalon must be a boolean value" });
    }
    if (typeof relayOpenWindowSalon !== "boolean") {
      return res.status(400).json({ status: false, message: "relayOpenWindowSalon must be a boolean value" });
    }
    if (typeof relayClimSalon !== "boolean") {
      return res.status(400).json({ status: false, message: "relayClimSalon must be a boolean value" });
    }

    // Mettre à jour uniquement  
    const updatedSalon = await Salon.findByIdAndUpdate(
      id,
      { $set: { relayOpenWindowSalon, relayCloseWindowSalon , relayClimSalon } },
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
    const { relayOpenWindowSalon,relayCloseWindowSalon, relayClimSalon, tempSalon, humSalon } = req.body;

    // Vérifier si l'ID est valide (ex: ObjectId MongoDB)
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid space ID format" });
    }

    // Vérifier que des données sont envoyées
    if (!relayOpenWindowSalon & !relayCloseWindowSalon & !relayClimSalon & !tempSalon& !humSalon) {
      return res.status(400).json({ status: false, message: "No data provided for update" });
    }

    // Trouver et mettre à jour l'espace
    const updateSalonByIdSalon = await Salon.findByIdAndUpdate(
      id,
      { $set: { relayOpenWindowSalon , relayCloseWindowSalon, relayClimSalon, tempSalon, humSalon } },
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
//getRelayByIdSalon
// hethi lil 5idma mta3 esp bech nista3milha f esp32
  // module.exports.getRelayByIdSalon = async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  
  //     // Vérifier l'ID
  //     if (!id || id.length !== 24) {
  //       return res.status(400).json({ status: false, message: "Invalid salon ID format" });
  //     }
  
  //     // Rechercher la salon et ne sélectionner que le champ relayClim
  //     const salon = await Salon.findById(id).select("relayClimSalon & relayOpenWindowSalon & relayCloseWindowSalon");
       
  
  //     if (!salon) {
  //       return res.status(404).json({ status: false, message: "Salon not found" });
  //     }
  
  //     return res.status(200).json({ status: true, relayOpenWindowSalon: salon.relayOpenWindowSalon, relayCloseWindowSalon: salon.relayCloseWindowSalon , relayClimSalon: salon.relayClimSalon });
  //   } catch (error) {
  //     console.log("Erreur dans getRelayByIdSalon:", error);
  //     next(error);
  //   }
  // };

module.exports.getRelayByIdSalon = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "ID Salon invalide." });
    }

    const salon = await Salon.findById(id).select("relayClimSalon  relayOpenWindowSalon relayCloseWindowSalon");

    if (!salon) {
      return res.status(404).json({ status: false, message: "Salon non trouvée." });
    }

    return res.status(200).json({ status: true, data: salon });
  } catch (error) {
    console.log("Erreur dans getRelayByIdSalon:", error);
    next(error);
  }
};
