const mongoose = require("mongoose");

const CapteurSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Exemple: "Mouvement" ou "Gaz"
    number: { type: Number, required: true },
    espace: { type: mongoose.Schema.Types.ObjectId, ref: "Espace", required: true },
  }, { timestamps: true });

const Capteur = mongoose.model("Capteur", CapteurSchema);
module.exports = Capteur;
