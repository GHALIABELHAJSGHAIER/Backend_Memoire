const mongoose = require("mongoose");

const CapteurMouvementSchema  = new mongoose.Schema({
    sensibilite: { type: Number, required: true },
  }, { timestamps: true });

const CapteurMouvement = mongoose.model("CapteurMouvement", CapteurMouvementSchema );
module.exports = CapteurMouvement;
