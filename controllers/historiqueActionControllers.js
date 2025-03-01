// actionController.js
const HistoriqueAction = require('../models/historiqueActionSchema');
const User = require('../models/userSchema');

// Fonction pour enregistrer une action
module.exports.enregistrerAction = async (req, res) => {
    const { userId, action, methodeEnregistrement } = req.body;

    try {
        // Vérification que l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Enregistrement de l'action dans l'historique sans toucher à la liste 'historiques' de l'utilisateur
        const nouvelleAction = new HistoriqueAction({
            user: userId,
            action: action,
            date: new Date(),
            heure: new Date().toLocaleTimeString(),
            methodeEnregistrement: methodeEnregistrement,
        });

        await nouvelleAction.save();
        res.status(201).json({ message: "Action enregistrée avec succès" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur du serveur" });
    }
};

 
