// Action History model (historiqueAction.js)
const mongoose = require('mongoose');

const historiqueActionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: String,   // Par exemple, "Ouverture de la porte"
    date: Date,
    heure: String,
    methodeEnregistrement: String, // Méthode d'enregistrement (par exemple, "Bouton Activé")
});

const HistoriqueAction = mongoose.model('HistoriqueAction', historiqueActionSchema);
module.exports = HistoriqueAction;
