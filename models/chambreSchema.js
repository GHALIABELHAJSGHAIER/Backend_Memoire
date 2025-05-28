const mongoose = require("mongoose");

const chambreSchema = new mongoose.Schema({
    relayClimChambre: {
        type: Boolean,  // Type boolean pour le champ relay
        required: true  // Le champ est obligatoire
    },
    relayLamp: {
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
    tempChambre: {
        type: Number,  // Type number (float)
        required: true  // Le champ est obligatoire
    },
    humChambre: {
        type: Number,  // Type number (float)
        required: true  // Le champ est obligatoire
    },
    espace: { type: mongoose.Schema.Types.ObjectId, ref: "Espace" ,required: true},  

}, { timestamps: true });

const Chambre = mongoose.model("Chambre", chambreSchema);
module.exports = Chambre;
