const mongoose = require("mongoose");

const appareilSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    type: { type: String, required: true },
    etat: { type: Boolean, default: false }, // false = éteint, true = allumé
    consommationEnergie: { type: Number, default: 0 },// en kWh
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null }, // Référence au client
    espace: { type: mongoose.Schema.Types.ObjectId, ref: 'Espace',  default: null }, // Référence au client
}, { timestamps: true }
);

// Méthodes pour allumer et éteindre l'appareil
appareilSchema.methods.allumer = function () {
    if (!this.etat) {
        this.etat = true;
        console.log(`${this.nom} est maintenant allumé.`);
    } else {
        console.log(`${this.nom} est déjà allumé.`);
    }
};

appareilSchema.methods.eteindre = function () {
    if (this.etat) {
        this.etat = false;
        console.log(`${this.nom} est maintenant éteint.`);
    } else {
        console.log(`${this.nom} est déjà éteint.`);
    }
};

appareilSchema.methods.mesurerConsommation = function (consommation) {
    if (!this.etat) {  
        throw new Error(`Impossible de mesurer la consommation : ${this.nom} est éteint.`);
    }
    this.consommationEnergie += consommation;
    console.log(`${this.nom} a consommé ${consommation} kWh.`);
};


const Appareil = mongoose.model("Appareil", appareilSchema);
module.exports = Appareil;
