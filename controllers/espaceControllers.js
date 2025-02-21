const Espace = require("../models/espaceSchema");
const Maison = require("../models/maisonSchema");
const mongoose = require("mongoose");

module.exports.addEspaceForMaison = async (req, res) => {
  try {
    const { maisonId, nom } = req.body;
    const maison = await Maison.findById(maisonId);
    if (!maison) {
      return res.status(404).json({ message: 'maison not found' });
    }

    const espace = new Espace({ nom, maison: maisonId });
    await espace.save();

    // Ajouter la espace au maison
    maison.espaces.push(espace);
    await maison.save();

    res.status(200).json({ maison });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
/*
module.exports.addEspaceForMaison = async (req, res) => {
    try {
      const { maisonId, nom } = req.body;
      
      if (!nom) {
        return res.status(400).json({ message: "Le champ 'nom' est requis." });
      }
  
      const maison = await Maison.findById(maisonId);
      if (!maison) {
        return res.status(404).json({ message: "Maison introuvable" });
      }
  
      const nouvelEspace = new Espace({ nom, maison: maisonId });
      await nouvelEspace.save();
  
      res.status(201).json({ message: "Espace ajouté avec succès", espace: nouvelEspace });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", erreur: error.message });
    }
  };
  */
  

/*  //delete
module.exports.supprimerEspace = async (req, res) => {
    try {
        const { id } = req.params;
        await Espace.findOneAndDelete({ id });
        res.status(200).json({ message: "Espace supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", error });
    }
};*/

module.exports.supprimerEspace = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Vérification de l'existence de l'espace dans la base de données
        const espaceById = await Espace.findById(id);
    
        if (!espaceById) {
          // Si l'espace n'est pas trouvé, renvoyer une erreur 404
          return res.status(404).json({ message: "Espace introuvable" });
        }
    
        // Retirer la référence de cet espace dans les maisons où il est référencé
        await Maison.updateMany(
          { espaces: id }, // Rechercher les maisons qui contiennent cet espace
          { $pull: { espaces: id } } // Retirer l'ID de l'espace du tableau 'espaces'
        );
    
        // Supprimer l'espace de la collection Espace
        await Espace.findByIdAndDelete(id);
    
        // Réponse de succès
        res.status(200).json({ message: "Espace supprimé avec succès" });
      } catch (error) {
        // En cas d'erreur, retourner un message d'erreur avec un statut 500
        console.error(error);
        res.status(500).json({ message: error.message });
      }
  };
  


//get all espace 
module.exports.getAllEspaces = async (req, res) => {
    try {
      const espaceList = await Espace.find();
  
      if (!espaceList || espaceList.length === 0) {
        throw new Error("Aucun espace trouvé");
      }
  
      res.status(200).json(espaceList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

 