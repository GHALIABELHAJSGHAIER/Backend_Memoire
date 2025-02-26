const mongoose = require("mongoose");

const capteurMouvementSchema  = new mongoose.Schema({
    sensibilite: { type: Number, required: true },
  }, { timestamps: true });

const CapteurMouvement = mongoose.model("CapteurMouvement", capteurMouvementSchema );
module.exports = CapteurMouvement;
