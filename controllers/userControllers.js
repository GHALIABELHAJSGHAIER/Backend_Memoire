const userModel = require('../models/userSchema');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
//const User = require('../models/userSchema');
const Maison = require('../models/maisonSchema');
require('dotenv').config();
//const SECRET_KEY = process.env.SECRET_KEY
const maxTime = 24 *60 * 60 //24H
//const maxTime = 90 * 24 * 60 * 60; // 90 jours = 3 mois


//const maxTime = 1 * 60 //1min
const createToken = (id) => {
    return jwt.sign({id},'net secret pfe', {expiresIn: maxTime })
} 

module.exports.addUserClient = async (req,res) => {
    try {
        const {username , email ,telephone, password  } = req.body;
        const roleClient = 'client'
        // if (!checkIfUserExists) {
        //     throw new Error("User not found");
        //   }
        const user = await userModel.create({
            username,email ,telephone,password,role :roleClient 
        })
        res.status(200).json({status:true,success:"User Registered Successfully"});
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message ?? "Registration Failed"
        });
    }
}

module.exports.login= async (req,res) => {
    try {
        const { email , password } = req.body;
        const user = await userModel.login(email, password)
        const token = createToken(user._id)
        res.cookie("jwt_token_9antra", token, {httpOnly:false,maxAge:maxTime * 1000})
        res.status(200).json({status:true,token:token})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
/*
module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.checkuser(email);
        if (!user) {
            throw new Error('User dont exist');
        }
        const isMatch = await user.comparePassword(password);
        if (isMatch == false) {
            throw new Error('Passwod Invalid');
        }
        let tokenData = { _id: user._id, email: user.email }
        const token = await UserService.generateToken(tokenData, "secretKey", '1h');
        res.status(200).json({ status: true, token: token });
    } catch (error) {
        next(error);
    }
    
}
*/
module.exports.getUserById= async (req,res) => {
    try {
        //const id = req.params.id
        const {id} = req.params
        //console.log(req.params.id)
        const user = await userModel.findById(id)

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        // 1. Récupérer l'utilisateur
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ status: false, message: "Utilisateur non trouvé" });
        }

        // 2. Vérifier le mot de passe actuel
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Mot de passe actuel incorrect" });
        }

        // 3. Hasher le nouveau mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 4. Mise à jour sans déclencher le .save() => pas de double hash
        await userModel.updateOne(
            { _id: id },
            { password: hashedPassword }
        );

        res.status(200).json({ status: true, message: "Mot de passe mis à jour avec succès" });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};
module.exports.updateuserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username, telephone } = req.body;

    if (!email && !username && !telephone) {
      return res.status(400).json({ message: "Aucune donnée à mettre à jour." });
    }

    const updated = await userModel.findByIdAndUpdate(
      id,
      { $set: { email, username,telephone } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({
      message: "Utilisateur mis à jour avec succès.",
      updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Supprimer l'utilisateur par son ID
        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ status: false, message: "Utilisateur non trouvé." });
        }

        res.status(200).json({ status: true, message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


/////
module.exports.logout= async (req,res) => {
    try {
  
        res.cookie("jwt_token_9antra", "", {httpOnly:false,maxAge:1})
        res.status(200).json("logged")
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



module.exports.addUserClientWithImg = async (req,res) => {
    try {
        const {username , email , password } = req.body;
        const roleClient = 'client'
        const {filename} = req.file

        const user = await userModel.create({
            username,email ,password,role :roleClient , user_image : filename
        })
        res.status(200).json({user});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Le nom d'utilisateur ou l'email existe déjà." });
        }
        res.status(500).json({ message: error.message });
    }
}


module.exports.addUserAdmin= async (req,res) => {
    try {
        const {username , email , password } = req.body;
        const roleAdmin = 'admin'
        console.log(roleAdmin)
        const user = await userModel.create({
            username,email ,password,role :roleAdmin
            
        })
        
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getAllUsers= async (req,res) => {
    try {
        const userListe = await userModel.find()
        //console.log(userListe)
        res.status(200).json({userListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.deleteUserById= async (req,res) => {
    try {

        const {id} = req.params
        const checkIfUserExists = await userModel.findById(id);
        if (!checkIfUserExists) {
          throw new Error("User not found");
        }

        await Maison.updateMany({User : id},{
            $unset: { User: 1 },// null "" 
          });

        await userModel.findByIdAndDelete(id)


        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



module.exports.searchUserByUsername = async (req, res) => {
    try {

        const { username } = req.query
        if(!username){
            throw new Error("Veuillez fournir un nom pour la recherche.");
        }

        const userListe = await userModel.find({
            username: {$regex: username , $options: "i"}
        })

        if (!userListe) {
            throw new Error("User not found");
          }
          const count = userListe.length
        res.status(200).json({userListe,count})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    }

    module.exports.getAllUsersSortByAge= async (req,res) => {
        try {
            const userListe = await userModel.find().sort({age : 1}).limit(2)
            //const userListe = await userModel.find().sort({age : -1}).limit(2)
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    
    module.exports.getAllUsersAge= async (req,res) => {
        try {
            const {age} = req.params
            const userListe = await userModel.find({ age : age})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    module.exports.getAllUsersAgeBetMaxAgeMinAge= async (req,res) => {
        try {
            const MaxAge = req.query.MaxAge
            const MinAge = req.query.MinAge
            const userListe = await userModel.find({age : { $gt : MinAge , $lt : MaxAge}}).sort({age : 1})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    module.exports.getAllClient= async (req,res) => {
        try {

            const userListe = await userModel.find({role : "client"})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    module.exports.getAllAdmin= async (req,res) => {
        try {

            const userListe = await userModel.find({role : "admin"})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }