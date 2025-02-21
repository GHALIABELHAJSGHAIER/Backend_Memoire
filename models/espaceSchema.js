const mongoose = require("mongoose");

const espaceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    maison: { type: mongoose.Schema.Types.ObjectId, ref: "Maison", required: true }
}, { timestamps: true });

const Espace = mongoose.model("Espace", espaceSchema);
module.exports = Espace;
