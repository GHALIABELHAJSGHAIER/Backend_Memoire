const mongoose = require("mongoose");

const garageSchema = new mongoose.Schema({
    portGarage: {
        type: Boolean,  // Type boolean pour le champ relay
        required: true  // Le champ est obligatoire
    },
   
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence au client

}, { timestamps: true });

const Garage = mongoose.model("Garage", garageSchema);
module.exports = Garage;
