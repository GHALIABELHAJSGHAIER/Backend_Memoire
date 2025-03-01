/*const mongoose = require("mongoose");

const capteurSchema = new mongoose.Schema({
 
    number: { type: Number, required: true },
    espace: { type: mongoose.Schema.Types.ObjectId, ref: "Espace", required: true },
    type: {
      type: String,
      enum: ["Mouvement", "Gaz"],
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
module.exports = Capteur;*/
const mongoose = require("mongoose");

const capteurSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    espace: { type: mongoose.Schema.Types.ObjectId, ref: "Espace", required: true },
    type: {
      type: String,
      enum: ["Mouvement", "Gaz"],
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
  },
  { timestamps: true }
);




capteurSchema.statics.detecterFuiteGaz = async function (capteurId, valeurDetectee) {
  try {
    const capteur = await this.findById(capteurId);
    if (!capteur) {
      console.error("Capteur introuvable");
      throw new Error("Capteur introuvable");
    }

    if (capteur.type !== "Gaz") {
      console.error("Ce capteur n'est pas de type Gaz");
      throw new Error("Ce capteur n'est pas de type Gaz");
    }

    if (valeurDetectee > capteur.seuilAlerte) {
      console.log(`🚨 Fuite de Gaz détectée pour le capteur ${capteur.number}`);
      console.info(`Fuite de Gaz détectée pour le capteur ${capteur.number}`);
      return `🚨 Fuite de Gaz détectée pour le capteur ${capteur.number}`;
    } else {
      console.log(`✅ Aucune fuite détectée pour le capteur ${capteur.number}`);
      console.info(`Aucune fuite détectée pour le capteur ${capteur.number}`);
      return `✅ Aucune fuite détectée pour le capteur ${capteur.number}`;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
capteurSchema.statics.detecterMouvement = async function (capteurId, valeurDetectee) {
  try {
    const capteur = await this.findById(capteurId);

    if (!capteur) {
      console.error("Capteur introuvable");
      throw new Error("Capteur introuvable");
    }

    if (capteur.type !== "Mouvement") {
      console.error("Ce capteur n'est pas de type Mouvement");
      throw new Error("Ce capteur n'est pas de type Mouvement");
    }

    if (valeurDetectee >= capteur.sensibilite) {
      console.log(`🚨 Mouvement détecté pour le capteur ${capteur.number}`);
      return `🚨 Mouvement détecté pour le capteur ${capteur.number}`;
    } else {
      console.log(`✅ Aucun mouvement détecté pour le capteur ${capteur.number}`);
      return `✅ Aucun mouvement détecté pour le capteur ${capteur.number}`;
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};
const Capteur = mongoose.model("Capteur", capteurSchema);
module.exports = Capteur;