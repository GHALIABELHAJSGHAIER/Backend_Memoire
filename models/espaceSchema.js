const mongoose = require("mongoose");

const espaceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    type: {
      type: String,
      enum: ["Cuisine", "WC", "Salon", "Chambre"],
      required: true
    },
    maison: { type: mongoose.Schema.Types.ObjectId, ref: "Maison", required: true },
    appareils: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appareil" }], // one to many
    capteurs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Capteur" }], // one to many

}, { timestamps: true });

const Espace = mongoose.model("Espace", espaceSchema);
module.exports = Espace;
