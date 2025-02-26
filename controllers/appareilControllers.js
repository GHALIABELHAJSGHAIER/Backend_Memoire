const Appareil = require("../models/appareilSchema");
const User = require("../models/userSchema");
const Espace = require("../models/espaceSchema"); // Assurez-vous que le chemin est correct
const mongoose = require('mongoose');  // Ajouter cette ligne pour importer mongoose

// Ajouter un appareil pour un client donné
 
module.exports.addAppareilByIdClient = async (req, res) => {
    try {
        const { clientId } = req.params;
        const { nom, type, etat, consommationEnergie } = req.body;

        // Vérifier si le client existe
        const client = await User.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: "Client introuvable" });
        }

        // Créer un nouvel appareil
        const appareil = new Appareil({ 
            nom, 
            type, 
            etat, 
            consommationEnergie, 
            client: clientId,
            espace: null
        });

        // Sauvegarder l'appareil
        await appareil.save();

        // Mettre à jour la liste des appareils du client sans valider le password
        client.appareils.push(appareil._id);
        await client.save({ validateBeforeSave: false }); // Désactive la validation

        res.status(201).json({ message: "Appareil ajouté avec succès", appareil });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.addAppareilByIdEspace = async (req, res) => {
    try {
        const { espaceId } = req.params;
        const { nom, type, etat, consommationEnergie } = req.body;

        // Vérifier si l'espace existe
        const espace = await Espace.findById(espaceId);
        if (!espace) {
            return res.status(404).json({ message: "Espace introuvable" });
        }

        // Créer un nouvel appareil
        const appareil = new Appareil({ 
            nom, 
            type, 
            etat, 
            consommationEnergie, 
            espace: espaceId,
            client: null // Ajout explicite pour éviter l'erreur
        });

        // Sauvegarder l'appareil
        await appareil.save();

        // Mettre à jour la liste des appareils de l'espace
        espace.appareils.push(appareil._id);
        await espace.save({ validateBeforeSave: false }); // Désactive la validation

        res.status(201).json({ message: "Appareil ajouté avec succès", appareil });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAllAppareil = async (req, res) => {
    try {
      const appareilList = await Appareil.find();
  
      if (!appareilList || appareilList.length === 0) {
        throw new Error("Aucun appareil trouvé");
      }
  
      res.status(200).json(appareilList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  module.exports.getAllAppareilByIdClient = async (req, res) => {
    try {
        const { clientId } = req.params;

        // Vérifier si le client existe
        const client = await User.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: "Client introuvable" });
        }

        // Récupérer les appareils du client avec les détails de l'espace
        const appareilList = await Appareil.find({ client: clientId }).populate("espace");

        if (!appareilList || appareilList.length === 0) {
            throw new Error("Aucun appareil trouvé pour ce client");
        }

        res.status(200).json(appareilList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.getAllAppareilByIdEspace = async (req, res) => {
    try {
        const { espaceId } = req.params;

        // Vérifier si l’espace existe
        const espace = await Espace.findById(espaceId);
        if (!espace) {
            return res.status(404).json({ message: "Espace introuvable" });
        }

        // Récupérer les appareils de l’espace avec les détails du client
        const appareilList = await Appareil.find({ espace: espaceId }).populate("client");

        if (!appareilList || appareilList.length === 0) {
            throw new Error("Aucun appareil trouvé pour cet espace");
        }

        res.status(200).json(appareilList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateAppareilByIdClient = async (req, res) => {
    try {
        const { clientId, appareilId } = req.params;
        const { nom, type, etat, consommationEnergie } = req.body;

        // Vérifier si l'appareil existe et appartient bien au client
        const appareil = await Appareil.findOne({ _id: appareilId, client: clientId });

        if (!appareil) {
            return res.status(404).json({ message: "Appareil introuvable pour ce client" });
        }

        // Mise à jour de l'appareil
        await Appareil.findByIdAndUpdate(appareilId, {
            $set: { nom, type, etat, consommationEnergie }
        });

        const updatedAppareil = await Appareil.findById(appareilId);

        res.status(200).json({ updatedAppareil });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateAppareilByIdEspace = async (req, res) => {
    try {
        const { espaceId, appareilId } = req.params;
        const { nom, type, etat, consommationEnergie } = req.body;

        // Vérifier si l'appareil existe et est bien associé à cet espace
        const appareil = await Appareil.findOne({ _id: appareilId, espace: espaceId });

        if (!appareil) {
            return res.status(404).json({ message: "Appareil introuvable pour cet espace" });
        }

        // Mise à jour de l'appareil
        await Appareil.findByIdAndUpdate(appareilId, {
            $set: { nom, type, etat, consommationEnergie }
        });

        const updatedAppareil = await Appareil.findById(appareilId);

        res.status(200).json({ updatedAppareil });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.updateAppareil = async (req, res) => {
  try {
    // Convertir l'ID en ObjectId valide
    const appareilId = mongoose.Types.ObjectId(req.params.id);

    const { clientId, espaceId, nom, type, etat, consommationEnergie } = req.body;

    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(appareilId)) {
      return res.status(400).json({ message: "ID de l'appareil invalide" });
    }

    // Vérifier si l'appareil existe
    const appareilById = await Appareil.findById(appareilId);

    if (!appareilById) {
      throw new Error("Appareil introuvable");
    }

    // Vérifier si au moins une donnée est fournie pour la mise à jour
    if (!clientId && !espaceId && !nom && !type && !etat && !consommationEnergie) {
      throw new Error("Données manquantes pour la mise à jour");
    }

    // Mise à jour de l'appareil
    await Appareil.findByIdAndUpdate(appareilId, {
      $set: { clientId, espaceId, nom, type, etat, consommationEnergie },
    });

    // Récupérer l'appareil mis à jour
    const updatedAppareil = await Appareil.findById(appareilId);

    res.status(200).json({ updatedAppareil });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'appareil:", error);
    res.status(500).json({ message: error.message });
  }
};  
module.exports.deleteAppareil = async (req, res) => {
    try {
      const { appareilId } = req.params;
  
      // Vérifier si l'appareil existe
      const appareilById = await Appareil.findById(appareilId);
  
      if (!appareilById) {
        throw new Error("Appareil introuvable");
      }
  
      // Supprimer l'appareil de tous les utilisateurs et espaces où il pourrait être référencé
      await User.updateMany({}, { $pull: { appareils: appareilId } });
      await Espace.updateMany({}, { $pull: { appareils: appareilId } });
  
      // Supprimer l'appareil de la base de données
      await Appareil.findByIdAndDelete(appareilId);
  
      res.status(200).json("deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Allumer un appareil
module.exports.allumerAppareil = async (req, res) => {
    try {
        const appareil = await Appareil.findById(req.params.id);
        if (!appareil) return res.status(404).json({ error: "Appareil non trouvé" });

        if (appareil.etat) {
            return res.status(400).json({ message: "L'appareil est déjà allumé." });
        }

        appareil.allumer();
        await appareil.save();
        
        res.status(200).json({ appareil, message: `${appareil.nom} a été allumé avec succès.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Éteindre un appareil
module.exports.eteindreAppareil = async (req, res) => {
    try {
        const appareil = await Appareil.findById(req.params.id);
        if (!appareil) return res.status(404).json({ error: "Appareil non trouvé" });

        if (!appareil.etat) {
            return res.status(400).json({ message: "L'appareil est déjà éteint." });
        }

        appareil.eteindre();  // Méthode à définir dans ton schéma pour éteindre l'appareil
        await appareil.save();

        res.status(200).json({ appareil, message: `${appareil.nom} a été éteint avec succès.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mesurer la consommation
module.exports.mesurerConsommation = async (req, res) => {
    try {
        const appareil = await Appareil.findById(req.params.id);
        if (!appareil) {
            return res.status(404).json({ error: "Appareil non trouvé" });
        }

        const { consommation } = req.body;
        if (!consommation || consommation <= 0) {
            return res.status(400).json({ error: "Consommation invalide." });
        }

        try {
            appareil.mesurerConsommation(consommation);  // Exécute la méthode
            await appareil.save();  // Sauvegarde si pas d'erreur

            res.status(200).json({
                appareil,
                message: `${appareil.nom} a consommé ${consommation} kWh.`
            });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 
