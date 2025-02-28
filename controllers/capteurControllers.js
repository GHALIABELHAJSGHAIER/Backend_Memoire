const Capteur = require("../models/capteurSchema");
const Espace = require("../models/espaceSchema");
const mongoose = require("mongoose");

module.exports.addCapteurByIdEspace = async (req, res) => {
    try {
      const { nomcapteur,type, number, sensibilite, seuilAlerte } = req.body;
      const { espaceId } = req.params;
  
      const espace = await Espace.findById(espaceId);
      if (!espace) {
        return res.status(404).json({ message: "Espace introuvable" });
      }
  
      const capteur = new Capteur({
        nomcapteur,
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
  
