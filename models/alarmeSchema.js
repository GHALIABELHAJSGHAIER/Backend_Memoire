const mongoose = require("mongoose");

const alarmeSchema = new mongoose.Schema({
    etat: {
        type: Boolean,  // Type boolean pour le champ relay
        required: true  // Le champ est obligatoire
    },
    mvm1: {
        type: Boolean,  // Type boolean pour le champ relay
        required: true  // Le champ est obligatoire
    },
    mvm2: {
        type: Boolean,  // Type boolean pour le champ relay
        required: true  // Le champ est obligatoire
    },

    alarmeBuzzzer: {
        type: Boolean,  // Type boolean pour le champ relay
        required: true  // Le champ est obligatoire
    },

    maison: { type: mongoose.Schema.Types.ObjectId, ref: 'Maison', required: true },
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],

}, { timestamps: true });

const Alarme = mongoose.model("Alarme", alarmeSchema);
module.exports = Alarme;
