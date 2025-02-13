const Maison = require('../models/maison');
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
  
