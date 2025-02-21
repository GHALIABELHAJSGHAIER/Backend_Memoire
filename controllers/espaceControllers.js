const Espace = require("../models/espaceSchema");
const Maison = require("../models/maisonSchema");
const mongoose = require("mongoose");


/*exports.addEspaceForMaison = async (req, res) => {
    try {
        const { maisonId, nom } = req.body;

        console.log("Requête reçue pour ajouter un espace :", req.body);

        // Vérifier si l'ID de la maison est valide
        if (!maisonId || !nom) {
            return res.status(400).json({ message: "Les champs 'maisonId' et 'nom' sont obligatoires." });
        }

        if (!mongoose.Types.ObjectId.isValid(maisonId)) {
            return res.status(400).json({ message: "ID de maison invalide." });
        }

        // Vérifier si la maison existe
        const maison = await Maison.findById(maisonId);
        if (!maison) {
            return res.status(404).json({ message: "Maison non trouvée." });
        }
        console.log("Maison trouvée :", maison);

        // Vérifier si un espace avec le même nom existe déjà pour cette maison
        const espaceExiste = await Espace.findOne({ nom, maison: maisonId });
        if (espaceExiste) {
            return res.status(400).json({ message: "Un espace avec ce nom existe déjà pour cette maison." });
        }

        // Création et sauvegarde du nouvel espace
        const nouvelEspace = new Espace({
            maison: maisonId,
            nom
        });

        await nouvelEspace.save();
        console.log("Espace créé :", nouvelEspace);

        // Ajouter l'espace à la liste des espaces de la maison
        maison.espaces.push(nouvelEspace._id);
        await maison.save();
        console.log("Espace ajouté à la maison");

        res.status(201).json({
            message: "Espace ajouté avec succès à la maison.",
            espace: nouvelEspace
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur de récupération", error });
    }
};*/
 
/*
module.exports.addEspaceForMaison = async (req, res) => {
    try {
        const { nom, maison } = req.body;

        // Vérification des champs obligatoires
        if (!nom || !maison) {
            return res.status(400).json({ message: "Le nom et la maison sont obligatoires." });
        }

        // Création d'un nouvel espace
        const nouvelEspace = new Espace({ nom, maison });

        // Sauvegarde dans la base de données
        await nouvelEspace.save();

        return res.status(201).json({
            message: "Espace ajouté avec succès",
            espace: nouvelEspace
        });

    } catch (error) {
        // Gestion spécifique des erreurs MongoDB (duplicate key, validation, etc.)
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Données invalides", erreur: error.message });
        } else if (error.code === 11000) {
            return res.status(409).json({ message: "Ce nom d'espace existe déjà." });
        }

        console.error("Erreur lors de l'ajout de l'espace:", error);
        return res.status(500).json({ message: "Une erreur est survenue, veuillez réessayer plus tard." });
    }
};
*/
/*module.exports.addEspaceForMaison = async (req, res) => {
    try {
      const { maisonId, nom } = req.body;
      const maison = await Maison.findById(maisonId);
      if (!maison) {
        return res.status(404).json({ message: 'maison not found' });
      }
  
      const espace = new Espace({ maison:maisonId,
        nom  });
      await espace.save();
  
      // Ajouter la maison au client
      maison.espace.push(espace);
      await maison.save();
  
      res.status(200).json({ espace });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Supprimer un espace
/*exports.supprimerEspace = async (req, res) => {
    try {
        const { id } = req.params;
        await Espace.findOneAndDelete({ id });
        res.status(200).json({ message: "Espace supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", error });
    }
};*/

// Lister tous les espaces
/*exports.getEspaces = async (req, res) => {
    try {
        const espaces = await Espace.find().populate("listeAppareils").populate("listeCapteurs");
        res.status(200).json(espaces);
    } catch (error) {
        res.status(500).json({ message: "Erreur de récupération", error });
    }
};
*/