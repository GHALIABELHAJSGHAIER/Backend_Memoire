const mongoose = require("mongoose");

const capteurSchema = new mongoose.Schema({
  nomcapteur: {
    type: String,
    required: true,
    unique: true,
  },
    number: { type: Number, required: true },
    espace: { type: mongoose.Schema.Types.ObjectId, ref: "Espace", required: true },
    type: {
      type: String,
      enum: ["Mouvement", "Gaz","infi"],
      required: true,
    },
    sensibilite: {
      type: Number,
      required: function () {
        return this.type === "Mouvement";
      },
      },  
      seuilAlerte: {
        type: Number,
        required: function () {
          return this.type === "Gaz";
        },
      },
  }, { timestamps: true });

const Capteur = mongoose.model("Capteur", capteurSchema);
module.exports = Capteur;
