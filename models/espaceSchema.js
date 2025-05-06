const mongoose = require("mongoose");

const espaceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    maison: { type: mongoose.Schema.Types.ObjectId, ref: "Maison", required: true },
    appareils: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appareil" }], // one to many
    cuisines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cuisine" }],
    capteurs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Capteur" }], // one to many

}, { timestamps: true });

const Espace = mongoose.model("Espace", espaceSchema);
module.exports = Espace;
