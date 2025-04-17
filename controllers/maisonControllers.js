const Maison = require('../models/maisonSchema');
const User = require('../models/userSchema');


module.exports.addMaisonForClient = async (req, res, next) => {
  try {
    const { clientId, name, address ,numCartEsp } = req.body;

    // Vérifier si le client existe
    const client = await User.findById(clientId).select("+maisons");
    if (!client) {
      return res.status(404).json({ status: false, message: 'Client not found' });
    }

    // Créer la maison
    const maison = await Maison.create({ name, address,numCartEsp, client: clientId });

    // Ajouter la maison au client
    client.maisons.push(maison);
    await client.save({ validateBeforeSave: false }); // Désactive la validation pour éviter de vérifier à nouveau la maison

    return res.status(200).json({
      status: true, success: maison
    });
  } catch (error) {
    next(error); // Passe l'erreur à un middleware de gestion des erreurs si disponible
  }
};
//getMaisonsByClientId
module.exports.getMaisonsByClientId = async (req, res, next) => {
  try {
    const { clientId } = req.params;

    // Vérifier si clientId est valide (ex : format ObjectId si MongoDB)
    if (!clientId || clientId.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid client ID format" });
    }

    // Rechercher les maisons associées au clientId
    const maisons = await Maison.find({ client: clientId });

    // Vérifier si des maisons existent pour ce client
    if (maisons.length === 0) {
      return res.status(404).json({ status: false, message: "No houses found for this client" });
    }

    return res.status(200).json({ status: true,success: maisons });
  } catch (error) {
    next(error); // Utilisation de next() pour que l'erreur soit gérée par un middleware global
  }
};
//delete
module.exports.deleteMaisonById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Vérifier si l'ID est valide (ex: ObjectId MongoDB)
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid house ID format" });
    }

    // Vérifier si la maison existe
    const maison = await Maison.findById(id);
    if (!maison) {
      return res.status(404).json({ status: false, message: "Maison not found" });
    }

    // Supprimer la maison du tableau de maisons des utilisateurs
    await User.updateMany({ maisons: id }, { $pull: { maisons: id } });

    // Supprimer la maison de la base de données
    await Maison.findByIdAndDelete(id);

    return res.status(200).json({ status: true, success: "Maison deleted successfully" });
  } catch (error) {
    next(error); // Laisse Express gérer l'erreur avec un middleware global
  }
};
//update
module.exports.updateMaison = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, address,numCartEsp } = req.body;

    // Vérifier si l'ID est valide (ex: ObjectId MongoDB)
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid house ID format" });
    }

    // Vérifier que des données sont envoyées
    if (!name & !address & !numCartEsp) {
      return res.status(400).json({ status: false, message: "No data provided for update" });
    }

    // Trouver et mettre à jour la maison
    const updatedMaison = await Maison.findByIdAndUpdate(
      id,
      { $set: { name, address,numCartEsp } },
      { new: true, runValidators: true } // Retourne la maison mise à jour et applique les validateurs du schéma
    );

    if (!updatedMaison) {
      return res.status(404).json({ status: false, message: "Maison not found" });
    }

    return res.status(200).json({ status: true, success: updatedMaison });
  } catch (error) {
    next(error); // Gestion des erreurs avec un middleware global
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