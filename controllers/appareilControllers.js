const Appareil = require("../models/appareilSchema");

// Ajouter un appareil
exports.ajouterAppareil = async (req, res) => {
    try {
        const { nom, type } = req.body;
        const nouvelAppareil = new Appareil({ nom, type });
        await nouvelAppareil.save();
        res.status(201).json(nouvelAppareil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Allumer un appareil
exports.allumerAppareil = async (req, res) => {
    try {
        const appareil = await Appareil.findById(req.params.id);
        if (!appareil) return res.status(404).json({ error: "Appareil non trouvé" });

        appareil.allumer();
        await appareil.save();
        res.json(appareil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Éteindre un appareil
exports.eteindreAppareil = async (req, res) => {
    try {
        const appareil = await Appareil.findById(req.params.id);
        if (!appareil) return res.status(404).json({ error: "Appareil non trouvé" });

        appareil.eteindre();
        await appareil.save();
        res.json(appareil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mesurer la consommation
exports.mesurerConsommation = async (req, res) => {
    try {
        const appareil = await Appareil.findById(req.params.id);
        if (!appareil) return res.status(404).json({ error: "Appareil non trouvé" });

        const { consommation } = req.body;
        appareil.mesurerConsommation(consommation);
        await appareil.save();
        res.json(appareil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les appareils
exports.getAppareils = async (req, res) => {
    try {
        const appareils = await Appareil.find();
        res.json(appareils);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
