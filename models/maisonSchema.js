const mongoose = require("mongoose");

const maisonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Référence au client
},
{ timestamps: true }
);

const Maison = mongoose.model("Maison", maisonSchema);
module.exports = Maison;

