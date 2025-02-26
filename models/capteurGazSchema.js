const mongoose = require("mongoose");

const capteurGazSchema   = new mongoose.Schema({
    seuilAlerte: { type: Number, required: true },
}, { timestamps: true });

const CapteurGaz = mongoose.model("CapteurGaz", capteurGazSchema  );
module.exports = CapteurGaz;
