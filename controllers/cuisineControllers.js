const Espace = require("../models/espaceSchema");
const Cuisine = require("../models/cuisineSchema");
const mongoose = require("mongoose");


module.exports.getCuisineById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Vérifier si l'ID est valide (ObjectId)
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid cuisine ID format" });
    }

    const cuisine = await Cuisine.findById(id).populate("espace"); // tu peux aussi peupler l'espace si nécessaire

    if (!cuisine) {
      return res.status(404).json({ status: false, message: "Cuisine not found" });
    }

    return res.status(200).json({ status: true, success: cuisine });
  } catch (error) {
    console.log("Erreur dans getCuisineById:", error);
    next(error);
  }
};

module.exports.updateRelayById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { relayInc } = req.body;

    // Vérifier l'ID
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Invalid cuisine ID format" });
    }

    // Vérifier si relayInc est bien fourni
    if (typeof relayInc !== "boolean") {
      return res.status(400).json({ status: false, message: "relayInc must be a boolean value" });
    }

    // Mettre à jour uniquement relayInc
    const updatedCuisine = await Cuisine.findByIdAndUpdate(
      id,
      { $set: { relayInc } },
      { new: true, runValidators: true }
    );

    if (!updatedCuisine) {
      return res.status(404).json({ status: false, message: "Cuisine not found" });
    }

    return res.status(200).json({ status: true, success: updatedCuisine });
  } catch (error) {
    console.log("Erreur dans updateRelayById:", error);
    next(error);
  }
};
/////////////

// module.exports.createCuisine = async (req, res, next) => {
//   try {
//     const {  espaceId,relayInc, flamme, gaz } = req.body;

//     // Vérifier si la espace existe
//     const espace = await Espace.findById(espaceId).select("+cuisines");
//     if (!espace) {
//       return res.status(404).json({ status: false, message: "Espace not found" });
//     }

//     // Créer l'espace
//     const cuisine = await Cuisine.create({ relayInc, flamme, gaz, espace: espaceId });
//     //     const espace = await Espace.create({ nom, maison: maisonId });

//     // Ajouter l'espace à la espace
//     espace.cuisines.push(cuisine);
//     await espace.save({ validateBeforeSave: false });

//     return res.status(200).json({
//       status: true,
//       success: cuisine
//     });
//   } catch (error) {
//     next(error); // Passer l'erreur au middleware de gestion d'erreurs
//   }
// };
// module.exports.getCuisineData = async (req, res, next) => {
//     try {
//         let cuisine = await Cuisine.find(); // <-- la bonne méthode ici
//         res.json({ status: true, success: cuisine });
//     } catch (error) {
//         console.log("Erreur dans getCuisineData:", error);
//         next(error);
//     }
// };
// // //update
// module.exports.updateCuisine = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { relayInc, flamme, gaz } = req.body;

//     // Vérifier si l'ID est valide (ex: ObjectId MongoDB)
//     if (!id || id.length !== 24) {
//       return res.status(400).json({ status: false, message: "Invalid space ID format" });
//     }

//     // Vérifier que des données sont envoyées
//     if (!relayInc & !flamme & !gaz) {
//       return res.status(400).json({ status: false, message: "No data provided for update" });
//     }

//     // Trouver et mettre à jour l'espace
//     const updateCuisine = await Cuisine.findByIdAndUpdate(
//       id,
//       { $set: { relayInc, flamme, gaz } },
//       { new: true, runValidators: true } // Retourne l'espace mis à jour avec validation du schéma
//     );

//     if (!updateCuisine) {
//       return res.status(404).json({ status: false, message: "Cuisine not found" });
//     }

//     return res.status(200).json({ status: true, success: updateCuisine });
//   } catch (error) {
//     next(error); // Laisse Express gérer les erreurs avec un middleware global
//   }
// };

//   module.exports.getRelayById = async (req, res, next) => {
//     try {
//       const { id } = req.params;
  
//       // Vérifier l'ID
//       if (!id || id.length !== 24) {
//         return res.status(400).json({ status: false, message: "Invalid cuisine ID format" });
//       }
  
//       // Rechercher la cuisine et ne sélectionner que le champ relayInc
//       const cuisine = await Cuisine.findById(id).select("relayInc");
  
//       if (!cuisine) {
//         return res.status(404).json({ status: false, message: "Cuisine not found" });
//       }
  
//       return res.status(200).json({ status: true, relayInc: cuisine.relayInc });
//     } catch (error) {
//       console.log("Erreur dans getRelayById:", error);
//       next(error);
//     }
//   };
  
///////////////////2222222222222222222
// module.exports.addEspaceForMaison = async (req, res, next) => {
//   try {
//     const { maisonId, nom } = req.body;

//     // Vérifier si la maison existe
//     const maison = await Maison.findById(maisonId).select("+espaces");
//     if (!maison) {
//       return res.status(404).json({ status: false, message: "Maison not found" });
//     }

//     // Créer l'espace
//     const espace = await Espace.create({ nom, maison: maisonId });

//     // Ajouter l'espace à la maison
//     maison.espaces.push(espace);
//     await maison.save({ validateBeforeSave: false });

//     return res.status(200).json({
//       status: true,
//       success: espace
//     });
//   } catch (error) {
//     next(error); // Passer l'erreur au middleware de gestion d'erreurs
//   }
// };
// //getAllEspacesByIdMaison
// module.exports.getAllEspacesByIdMaison = async (req, res, next) => {
//   try {
//     const { maisonId } = req.params;

//     // Vérifier si maisonId est valide (format ObjectId si MongoDB)
//     if (!maisonId || maisonId.length !== 24) {
//       return res.status(400).json({ status: false, message: "Invalid house ID format" });
//     }

//     // Rechercher les espaces associés à la maison
//     const espaces = await Espace.find({ maison: maisonId });

//     // Vérifier si des espaces existent pour cette maison
//     if (espaces.length === 0) {
//       return res.status(404).json({ status: false, message: "No spaces found for this house" });
//     }

//     return res.status(200).json({ status: true, success: espaces });
//   } catch (error) {
//     next(error); // Utilisation de next() pour que l'erreur soit gérée par un middleware global
//   }
// };

// //delete
// module.exports.deleteEspaceById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     // Vérifier si l'ID est valide (ex: ObjectId MongoDB)
//     if (!id || id.length !== 24) {
//       return res.status(400).json({ status: false, message: "Invalid space ID format" });
//     }

//     // Vérifier si l'espace existe
//     const espace = await Espace.findById(id);
//     if (!espace) {
//       return res.status(404).json({ status: false, message: "Space not found" });
//     }

//     // Supprimer l'espace du tableau d'espaces de la maison
//     await Maison.updateMany({ espaces: id }, { $pull: { espaces: id } });

//     // Supprimer l'espace de la base de données
//     await Espace.findByIdAndDelete(id);

//     return res.status(200).json({ status: true, success: "Space deleted successfully" });
//   } catch (error) {
//     next(error); // Laisse Express gérer l'erreur avec un middleware global
//   }
// };

// //update
// module.exports.updateEspace = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { nom } = req.body;

//     // Vérifier si l'ID est valide (ex: ObjectId MongoDB)
//     if (!id || id.length !== 24) {
//       return res.status(400).json({ status: false, message: "Invalid space ID format" });
//     }

//     // Vérifier que des données sont envoyées
//     if (!nom) {
//       return res.status(400).json({ status: false, message: "No data provided for update" });
//     }

//     // Trouver et mettre à jour l'espace
//     const updatedEspace = await Espace.findByIdAndUpdate(
//       id,
//       { $set: { nom } },
//       { new: true, runValidators: true } // Retourne l'espace mis à jour avec validation du schéma
//     );

//     if (!updatedEspace) {
//       return res.status(404).json({ status: false, message: "Espace not found" });
//     }

//     return res.status(200).json({ status: true, success: updatedEspace });
//   } catch (error) {
//     next(error); // Laisse Express gérer les erreurs avec un middleware global
//   }
// };




// //get all espace 
// module.exports.getAllEspaces = async (req, res) => {
//   try {
//     const espaceList = await Espace.find();

//     if (!espaceList || espaceList.length === 0) {
//       throw new Error("Aucun espace trouvé");
//     }

//     res.status(200).json(espaceList);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// module.exports.getEspacesById = async (req, res) => {
//   try {
//     const id = req.params.id;

//     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ message: "ID invalide" });
//     }

//     const espace = await Espace.findById(id)
//       .populate("maison"); // Use lowercase 'maison'

//     if (!espace) {
//       return res.status(404).json({ message: "Espace introuvable" });
//     }

//     res.status(200).json(espace);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur serveur", error: error.message });
//   }
// };





