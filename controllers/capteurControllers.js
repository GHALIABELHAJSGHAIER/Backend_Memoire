const Capteur = require("../models/capteurSchema");
const Espace = require("../models/espaceSchema");
const mongoose = require("mongoose");

module.exports.addCapteurByIdEspace = async (req, res) => {
    try {
        const { type, number, sensibilite, seuilAlerte } = req.body;
        const { espaceId } = req.params;

        const espace = await Espace.findById(espaceId);
        if (!espace) {
            return res.status(404).json({ message: "Espace introuvable" });
        }

        const capteur = new Capteur({
            type,
            number,
            sensibilite,
            seuilAlerte,
            espace: espaceId,
        });

        await capteur.save();
        espace.capteurs.push(capteur._id);
        await espace.save();

        res.status(200).json({ message: "Capteur ajouté avec succès", capteur });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//get all Capteur 
module.exports.getAllCapteur = async (req, res) => {
    try {
        const capteurList = await Capteur.find();

        if (!capteurList || capteurList.length === 0) {
            throw new Error("Aucun Capteur trouvé");
        }

        res.status(200).json(capteurList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//getAllCapteurType 
module.exports.getAllCapteurType = async (req, res) => {
    try {
      const { type } = req.params; // Récupérer le type depuis les paramètres URL
  
      // Vérifier si le type est valide
      if (type !== "Gaz" && type !== "Mouvement") {
        return res.status(400).json({ message: "Type invalide, veuillez choisir Gaz ou Mouvement" });
      }
  
      const capteurList = await Capteur.find({ type: type }); // Filtrer les capteurs par type
  
      if (capteurList.length === 0) {
        return res.status(404).json({ message: `Aucun capteur de type ${type} trouvé` });
      }
  
      res.status(200).json(capteurList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  //getCapteurCountByType
  module.exports.getCapteurCountByType = async (req, res) => {
    try {
      const { type } = req.params; // Récupérer le type depuis les paramètres URL
  
      // Vérifier si le type est valide
      if (type !== "Gaz" && type !== "Mouvement") {
        return res.status(400).json({ message: "Type invalide, veuillez choisir Gaz ou Mouvement" });
      }
  
      // Compter le nombre de capteurs par type
      const capteurCount = await Capteur.countDocuments({ type: type });
  
      res.status(200).json({ type: type, count: capteurCount });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
    //update
module.exports.updateCapteur = async (req, res) => {
    try {
        const id = req.params.id;
      const { type, number, sensibilite, seuilAlerte } = req.body;
  
      const capteurById = await Capteur.findById(id);
  
      if (!capteurById) {
        throw new Error("capteur introuvable");
      }
  
      if (!type & !number & !sensibilite & !seuilAlerte) {
        throw new Error("errue data");
      }
  
      await Capteur.findByIdAndUpdate(id, {
        $set: { type, number, sensibilite, seuilAlerte  },
      });
  
      const updated = await Capteur.findById(id);
  
      res.status(200).json({ updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //delete
  module.exports.deleteCapteurById = async (req, res) => {
    try {
      const id = req.params.id;
  
      const capteurById = await Capteur.findById(id);
  
      if (!capteurById) {
        throw new Error("Capteur introuvable");
      }
  
      // Supprimer l'ID du capteur dans la table Espace
      await Espace.updateMany(
        { capteurs: id },
        { $pull: { capteurs: id } }
      );
  
      // Supprimer le capteur
      await Capteur.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Capteur supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
//detecterFuiteGaz
module.exports.detecterFuiteGaz = async (req, res) => {
    try {
        const { capteurId, valeurDetectee } = req.body;

        const notification = await Capteur.detecterFuiteGaz(capteurId, valeurDetectee);

        res.status(200).json({
            message: "Détection terminée",
            notification,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//detecterMouvement
module.exports.detecterMouvement = async (req, res) => {
    try {
      const { capteurId, valeurDetectee } = req.body;
  
      const notification = await Capteur.detecterMouvement(capteurId, valeurDetectee);
  
      res.status(200).json({
        message: "Détection de mouvement terminée",
        notification,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  