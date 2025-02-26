const mongoose = require("mongoose");

const CapteurGazSchema   = new mongoose.Schema({
    seuilAlerte: { type: Number, required: true },
}, { timestamps: true });

const CapteurGaz = mongoose.model("CapteurGaz", CapteurGazSchema  );
module.exports = CapteurGaz;
