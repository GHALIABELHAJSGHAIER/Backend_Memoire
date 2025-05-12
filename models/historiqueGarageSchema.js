// models/historiqueGarageSchema.js
const mongoose = require("mongoose");

const historiqueGarageSchema = new mongoose.Schema({
  garage: { type: mongoose.Schema.Types.ObjectId, ref: 'Garage', required: true },
  etat: { type: Boolean, required: true }, // true = ouvert, false = fermé
  date: { type: Date, default: Date.now }  // Date automatique
});

const HistoriqueGarage = mongoose.model("HistoriqueGarage", historiqueGarageSchema);
module.exports = HistoriqueGarage;
