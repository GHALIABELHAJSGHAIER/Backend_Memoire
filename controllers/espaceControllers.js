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

    const espace = new Espace({ id: null, nom, maison: maisonId });

    await espace.save();

    // Ajouter la espace au maison
    maison.espaces.push(espace);
    await maison.save();

    res.status(200).json({ maison });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 


 //delete
module.exports.deleteEspaceById = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Vérifier si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const espaceById = await Espace.findById(new mongoose.Types.ObjectId(id));

        if (!espaceById) {
            return res.status(404).json({ message: "Espace introuvable" });
        }

        await Maison.updateMany({}, { $pull: { espaces: id } });

        await Espace.findByIdAndDelete(id);

        res.status(200).json({ message: "Espace supprimé avec succès" });
    } catch (error) {
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

module.exports.getAllEspacesByIdMaison = async (req, res) => {
    try {
      const { maisonId } = req.params;
      const espaces = await Espace.find({ maison: maisonId });
      
      if (!espaces || espaces.length === 0) {
        return res.status(404).json({ message: 'No spaces found for this house' });
      }
      
      res.status(200).json({ espaces });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.getEspacesById = async (req, res) => {
    try {
      const id = req.params.id;
  
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "ID invalide" });
      }
  
      const espace = await Espace.findById(id)
        .populate("maison"); // Use lowercase 'maison'
  
      if (!espace) {
        return res.status(404).json({ message: "Espace introuvable" });
      }
  
      res.status(200).json(espace);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };
  
  //update
module.exports.updateEspace = async (req, res) => {
    try {
      const id = req.params.id;
      const { maisonId, nom } = req.body;
  
      const espaceById = await Espace.findById(id);
  
      if (!espaceById) {
        throw new Error("Maison introuvable");
      }
  
      if (!maisonId & !nom) {
        throw new Error("errue data");
      }
  
      await Espace.findByIdAndUpdate(id, {
        $set: { maisonId, nom },
      });
  
      const updated = await Espace.findById(id);
  
      res.status(200).json({ updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


 