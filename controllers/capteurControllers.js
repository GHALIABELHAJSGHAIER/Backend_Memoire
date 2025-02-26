const Capteur = require("../models/capteurSchema");
const Espace = require("../models/espaceSchema");
const mongoose = require("mongoose");

module.exports.addCapteurByIdEspace = async (req, res) => {
    try {
        const { type, number } = req.body;
        const { espaceId } = req.params; //   Récupérer l'ID depuis `req.params`

        // Vérifier si l'espace existe
        const espace = await Espace.findById(espaceId);
        if (!espace) {
            return res.status(404).json({ message: "Espace introuvable" });
        }

        // Créer un nouveau capteur
        const capteur = new Capteur({ type, number, espace: espaceId });
        await capteur.save();

        // Ajouter le capteur à l'espace
        espace.capteurs.push(capteur._id);
        await espace.save();

        res.status(200).json({ message: "Capteur ajouté avec succès", capteur });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
