const Maison = require('../models/maisonSchema');
const User = require('../models/userSchema');


module.exports.addMaisonForClient = async (req, res) => {
  try {
    const { clientId, name, address } = req.body;
    const client = await User.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const maison = new Maison({ name, address, client: clientId });
    await maison.save();

    // Ajouter la maison au client
    client.maisons.push(maison);
    await client.save();

    res.status(200).json({ maison });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all maisioon 
module.exports.getAllMaison = async (req, res) => {
  try {
    const maisonList = await Maison.find();

    if (!maisonList || maisonList.length === 0) {
      throw new Error("Aucun voiture trouvé");
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


//delete
module.exports.deleteMaisonById = async (req, res) => {
  try {
    const id = req.params.id;

    const maisonById = await Maison.findById(id);

    if (!maisonById || maisonById.length === 0) {
      throw new Error("voiture introuvable");
    }

      
    await User.updateMany({}, {
        $pull: { maisons: id },
      });

    await Maison.findByIdAndDelete(id);

    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.getMaisonsByClientId = async (req, res) => {
    try {
      const { clientId } = req.params;
      const maisons = await Maison.find({ client: clientId });
  
      if (!maisons) {
        return res.status(404).json({ message: 'No houses found for this client' });
      }
  
      res.status(200).json({ maisons });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
