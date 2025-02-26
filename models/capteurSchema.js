const mongoose = require("mongoose");

const capteurSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Exemple: "Mouvement" ou "Gaz"
    number: { type: Number, required: true },
    espace: { type: mongoose.Schema.Types.ObjectId, ref: "Espace", required: true },
  }, { timestamps: true });

const Capteur = mongoose.model("Capteur", capteurSchema);
module.exports = Capteur;
