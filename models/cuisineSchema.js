const mongoose = require("mongoose");

const cuisineSchema = new mongoose.Schema({
    relayInc: {
        type: Boolean,  // Type boolean pour le champ relay
        required: true  // Le champ est obligatoire
    },
    flamme: {
        type: Number,  // Type number (float)
        required: true  // Le champ est obligatoire
    },
    gaz: {
        type: Number,  // Type number (float)
        required: true  // Le champ est obligatoire
    },
    espace: { type: mongoose.Schema.Types.ObjectId, ref: "Espace" }, // one to many

}, { timestamps: true });

const Cuisine = mongoose.model("Cuisine", cuisineSchema);
module.exports = Cuisine;
