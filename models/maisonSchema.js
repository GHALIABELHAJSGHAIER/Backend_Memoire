const mongoose = require("mongoose");

const maisonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
   // image: { type: String, required: true }, // Image en base64
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence au client
    espaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Espace" }] // Liste des espaces
}, { timestamps: true });

const Maison = mongoose.model("Maison", maisonSchema);
module.exports = Maison;
