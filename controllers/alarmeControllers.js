const Maison = require('../models/maisonSchema');
const Alarme = require('../models/alarmeSchema');
const Notification = require('../models/notificationSchema');

const mongoose = require("mongoose");

module.exports.createAlarme = async (req, res, next) => {
  try {
    const { etat, mvm1, mvm2, alarmeBuzzzer, maison } = req.body;

    // Validation des types
    if ([etat, mvm1, mvm2, alarmeBuzzzer].some(v => typeof v !== 'boolean')) {
      return res.status(400).json({ success: false, error: "Tous les champs etat, mvm1, mvm2, alarmeBuzzzer doivent être des booléens" });
    }

    // Vérification de l'ID maison
    if (!isValidObjectId(id)) {
  return res.status(400).json({ message: "ID invalide" });
}


    const maisonExists = await Maison.findById(maison);
    if (!maisonExists) {
      return res.status(404).json({ success: false, error: "Maison introuvable" });
    }

    // Création de l'alarme
    const newAlarme = await Alarme.create({ etat, mvm1, mvm2, alarmeBuzzzer, maison });
    return res.status(201).json({ success: true, data: newAlarme });

  } catch (err) {
    console.error("Erreur dans createAlarme :", err);
    next(err);
  }
};
module.exports.getAlarmeByIdMaison = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Vérification de l'ID
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Format d'ID maison invalide" });
    }

    // Recherche des alarmes associées à cette maison
    const alarmes = await Alarme.find({ maison: id }).populate("maison");

    if (!alarmes || alarmes.length === 0) {
      return res.status(404).json({ status: false, message: "Aucune alarme trouvée pour cette maison" });
    }

    return res.status(200).json({ status: true, success: alarmes });
  } catch (error) {
    console.error("Erreur dans getAlarmeByIdMaison:", error);
    next(error);
  }
};
module.exports.updateEtatAlarmeByIdAlarme = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { etat } = req.body;

    // Vérifier l'ID
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Format d'ID alarme invalide" });
    }

    // Vérifier que 'etat' est bien un booléen
    if (typeof etat !== "boolean") {
      return res.status(400).json({ status: false, message: "Le champ 'etat' doit être un booléen" });
    }

    // Mettre à jour uniquement le champ 'etat'
    const updatedAlarme = await Alarme.findByIdAndUpdate(
      id,
      { $set: { etat } },
      { new: true, runValidators: true }
    );

    if (!updatedAlarme) {
      return res.status(404).json({ status: false, message: "Alarme non trouvée" });
    }

    return res.status(200).json({ status: true, success: updatedAlarme });
  } catch (error) {
    console.error("Erreur dans updateEtatAlarmeByIdAlarme:", error);
    next(error);
  }
};
//bech ni5dim bihoum f esp32
module.exports.updateAlarmeByIdAlarme = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { etat, mvm1, mvm2, alarmeBuzzzer } = req.body;

    // Validation de l'ID alarme
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Format d'ID alarme invalide" });
    }

    const fieldsToUpdate = {};

    if (etat !== undefined) {
      if (typeof etat !== 'boolean') {
        return res.status(400).json({ status: false, message: "Le champ 'etat' doit être un booléen" });
      }
      fieldsToUpdate.etat = etat;
    }

    if (mvm1 !== undefined) {
      if (typeof mvm1 !== 'boolean') {
        return res.status(400).json({ status: false, message: "Le champ 'mvm1' doit être un booléen" });
      }
      fieldsToUpdate.mvm1 = mvm1;
    }

    if (mvm2 !== undefined) {
      if (typeof mvm2 !== 'boolean') {
        return res.status(400).json({ status: false, message: "Le champ 'mvm2' doit être un booléen" });
      }
      fieldsToUpdate.mvm2 = mvm2;
    }

    if (alarmeBuzzzer !== undefined) {
      if (typeof alarmeBuzzzer !== 'boolean') {
        return res.status(400).json({ status: false, message: "Le champ 'alarmeBuzzzer' doit être un booléen" });
      }
      fieldsToUpdate.alarmeBuzzzer = alarmeBuzzzer;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ status: false, message: "Aucun champ à mettre à jour" });
    }

    // Mettre à jour l'alarme
    const updatedAlarme = await Alarme.findByIdAndUpdate(
      id,
      { $set: fieldsToUpdate },
      { new: true, runValidators: true }
    );

    if (!updatedAlarme) {
      return res.status(404).json({ status: false, message: "Alarme non trouvée" });
    }

    // Si alarmeBuzzzer est passé à true, créer une notification
    if (alarmeBuzzzer === true) {
      await Notification.create({
        alarme: id,
        notif_msg: "Alarme buzzer activée !",
        date: new Date()
      });
    }

    return res.status(200).json({ status: true, success: updatedAlarme });
  } catch (error) {
    console.error("Erreur dans updateAlarmeByIdAlarme:", error);
    next(error);
  }
};
// module.exports.updateAlarmeByIdAlarme = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { etat, mvm1, mvm2, alarmeBuzzzer } = req.body;

//     if (!id || id.length !== 24) {
//       return res.status(400).json({ status: false, message: "Format d'ID alarme invalide" });
//     }

//     const fieldsToUpdate = {};

//     if (etat !== undefined) {
//       if (typeof etat !== 'boolean') {
//         return res.status(400).json({ status: false, message: "Le champ 'etat' doit être un booléen" });
//       }
//       fieldsToUpdate.etat = etat;
//     }

//     if (mvm1 !== undefined) {
//       if (typeof mvm1 !== 'boolean') {
//         return res.status(400).json({ status: false, message: "Le champ 'mvm1' doit être un booléen" });
//       }
//       fieldsToUpdate.mvm1 = mvm1;
//     }

//     if (mvm2 !== undefined) {
//       if (typeof mvm2 !== 'boolean') {
//         return res.status(400).json({ status: false, message: "Le champ 'mvm2' doit être un booléen" });
//       }
//       fieldsToUpdate.mvm2 = mvm2;
//     }

//     if (alarmeBuzzzer !== undefined) {
//       if (typeof alarmeBuzzzer !== 'boolean') {
//         return res.status(400).json({ status: false, message: "Le champ 'alarmeBuzzzer' doit être un booléen" });
//       }
//       fieldsToUpdate.alarmeBuzzzer = alarmeBuzzzer;
//     }

//     if (Object.keys(fieldsToUpdate).length === 0) {
//       return res.status(400).json({ status: false, message: "Aucun champ à mettre à jour" });
//     }

//     const updatedAlarme = await Alarme.findByIdAndUpdate(
//       id,
//       { $set: fieldsToUpdate },
//       { new: true, runValidators: true }
//     );

//     if (!updatedAlarme) {
//       return res.status(404).json({ status: false, message: "Alarme non trouvée" });
//     }

//     return res.status(200).json({ status: true, success: updatedAlarme });
//   } catch (error) {
//     console.error("Erreur dans updateAlarmeByIdAlarme:", error);
//     next(error);
//   }
// };
module.exports.getEtatAlarmeByIdAlarme = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Vérification de l'ID (doit être une chaîne de 24 caractères)
    if (!id || id.length !== 24) {
      return res.status(400).json({ status: false, message: "Format d'ID alarme invalide" });
    }

    // Recherche de l'alarme avec uniquement le champ 'etat'
    const alarme = await Alarme.findById(id).select("etat");

    if (!alarme) {
      return res.status(404).json({ status: false, message: "Alarme non trouvée" });
    }

    // Réponse structurée
    return res.status(200).json({
      status: true,
      success: {
        _id: id,
        etat: alarme.etat
      }
    });

  } catch (error) {
    console.error("Erreur dans getEtatAlarmeByIdAlarme:", error);
    return res.status(500).json({ status: false, message: "Erreur interne du serveur" });
  }
};
