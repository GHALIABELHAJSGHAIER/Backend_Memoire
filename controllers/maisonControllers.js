const Maison = require('../models/maisonSchema');
const User = require('../models/userSchema');


module.exports.addMaisonForClient = async (req, res, next) => {
  try {
    const { clientId, name, address } = req.body;

    // Vérifier si le client existe
    const client = await User.findById(clientId).select("+maisons");
    if (!client) {
      return res.status(404).json({ status: false, message: 'Client not found' });
    }

    // Créer la maison
    const maison = await Maison.create({ name, address, client: clientId });

    // Ajouter la maison au client
    client.maisons.push(maison);
    await client.save({ validateBeforeSave: false }); // Désactive la validation pour éviter de vérifier à nouveau la maison

    return res.status(200).json({
      status: true, success: maison });
  } catch (error) {
    next(error); // Passe l'erreur à un middleware de gestion des erreurs si disponible
  }
};

module.exports.getMaisonsByClientId = async (req, res) => {
  try {
    const { clientId } = req.params;

    // Vérifier si le client existe et obtenir ses maisons
    const maisons = await Maison.find({ client: clientId });

    // Si aucune maison n'est trouvée pour ce client
    if (!maisons || maisons.length === 0) {
      return res.status(404).json({ status: false, message: 'No houses found for this client' });
    }

    return res.status(200).json({ status: true, maisons });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};


//delete
module.exports.deleteMaisonById = async (req, res) => {
  try {
    const id = req.params.id;

    // Vérifier si la maison existe
    const maisonById = await Maison.findById(id);
    if (!maisonById) {
      return res.status(404).json({ status: false, message: "Maison not found" });
    }

    // Supprimer la maison du tableau de maisons des clients
    await User.updateMany({ "maisons": id }, {
      $pull: { maisons: id },
    });

    // Supprimer la maison
    await Maison.findByIdAndDelete(id);

    return res.status(200).json({ status: true, message: "Maison deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports.addMaison = async (req, res) => {
  try {
    const { name, address, image } = req.body;

    // Vérifier que les champs obligatoires sont bien fournis
    if (!name || !address || !image) {
      return res.status(400).json({ message: 'Nom, adresse, et image sont requis' });
    }

    // Créer la maison avec l'image (base64)
    const maison = new Maison({
      name,
      address,
      image, // Stocker l'image base64
    });

    await maison.save();

    res.status(200).json({ message: "Maison ajoutée avec succès !", maison });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//get all maisioon 
module.exports.getAllMaison = async (req, res) => {
  try {
    const maisonList = await Maison.find();

    if (!maisonList || maisonList.length === 0) {
      throw new Error("Aucun Maison trouvé");
    }

    res.status(200).json(maisonList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getMaisonById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const maison = await Maison.findById(id).populate("client"); // Assure-toi que "client" est bon !

    if (!maison) {
      return res.status(404).json({ message: "Maison introuvable" });
    }

    res.status(200).json(maison);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
//update
module.exports.updateMaison = async (req, res) => {
  try {
    const id = req.params.id;
    const { clientId, name, address  } = req.body;

    const maisonById = await Maison.findById(id);

    if (!maisonById) {
      throw new Error("Maison introuvable");
    }

    if (!clientId & !name & !address) {
      throw new Error("errue data");
    }

    await Maison.findByIdAndUpdate(id, {
      $set: { clientId, name, address },
    });

    const updated = await Maison.findById(id);

    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







  module.exports.affect = async (req, res) => {
    try {
      const { userId, maisonId } = req.body;
  
      const maisonById = await Maison.findById(maisonId);
  
      if (!maisonById) {
        throw new Error("Maison introuvable");
      }
      const checkIfUserExists = await User.findById(userId);
      if (!checkIfUserExists) {
        throw new Error("User not found");
      }
  
      await Maison.findByIdAndUpdate(maisonId, {
        $set: { User: userId },
      });
  
      await User.findByIdAndUpdate(userId, {
        $push: { maisons: maisonId },
      });
  
      res.status(200).json('affected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports.desaffect = async (req, res) => {
    try {
      const { userId, maisonId } = req.body;
  
      const maisonById = await Maison.findById(maisonId);
  
      if (!maisonById) {
        throw new Error("Maison introuvable");
      }
      const checkIfUserExists = await User.findById(userId);
      if (!checkIfUserExists) {
        throw new Error("User not found");
      }
  
      await Maison.findByIdAndUpdate(maisonId, {
        $unset: { User: 1 },// null "" 
      });
  
      await User.findByIdAndUpdate(userId, {
        $pull: { maisons: maisonId },
      });
  
      res.status(200).json('desaffected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };