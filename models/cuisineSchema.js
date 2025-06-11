const mongoose = require("mongoose");

const cuisineSchema = new mongoose.Schema({
    relayInc: {
        type: Boolean,
        required: true
    },
    flamme: {
        type: Boolean,
        required: true
    },
    gaz: {
        type: Boolean,
        required: true
    },
    espace: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Espace", 
        required: true 
    },
}, { timestamps: true });

const Cuisine = mongoose.model("Cuisine", cuisineSchema);
module.exports = Cuisine;
