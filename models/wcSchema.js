const mongoose = require("mongoose");

const wcSchema = new mongoose.Schema({
    relaySolarHeat: {
        type: Boolean,  // Type boolean pour le champ relay
        required: true  // Le champ est obligatoire
    },
    relayHeat: {
        type: Boolean,  // Type boolean pour le champ relay
        required: true  // Le champ est obligatoire
    },
    tempWC: {
        type: Number,  // Type number (float)
        required: true  // Le champ est obligatoire
    },
    humWC: {
        type: Number,  // Type number (float)
        required: true  // Le champ est obligatoire
    },
    espace: { type: mongoose.Schema.Types.ObjectId, ref: "Espace" ,required: true},  

}, { timestamps: true });

const Wc = mongoose.model("Wc", wcSchema);
module.exports = Wc;
