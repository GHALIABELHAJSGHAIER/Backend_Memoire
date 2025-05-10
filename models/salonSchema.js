const mongoose = require("mongoose");

const salonSchema = new mongoose.Schema({
    relayClim: {
        type: Boolean,  // Type boolean pour le champ relay
        required: true  // Le champ est obligatoire
    },
    relayOpenWindow: {
        type: Boolean,  // Type boolean pour le champ relay
        required: true  // Le champ est obligatoire
    },
        relayCloseWindow: {
        type: Boolean,  // Type boolean pour le champ relay
        required: true  // Le champ est obligatoire
    },
    temperature: {
        type: Number,  // Type number (float)
        required: true  // Le champ est obligatoire
    },
    humidity: {
        type: Number,  // Type number (float)
        required: true  // Le champ est obligatoire
    },
    espace: { type: mongoose.Schema.Types.ObjectId, ref: "Espace" ,required: true},  

}, { timestamps: true });

const Salon = mongoose.model("Salon", salonSchema);
module.exports = Salon;
