const userModel = require('../models/userSchema');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Maison = require('../models/maisonSchema');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY

 //  SIGN UP (Inscription)
  module.exports.signUp = async (req,res) => {
    try {
        const {username , email , password , age} = req.body;
        const roleClient = 'client'
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await userModel.findOne({ email });
         if (existingUser) {
            return res.status(400).json({ message: "L'utilisateur existe déjà." });
           }

        // Hacher le mot de passe
       //const hashedPassword = await bcrypt.hash(password, 10);
        // Créer l'utilisateur
        const user = await userModel.create({
            username,email ,password,role :roleClient, age
        })
        res.status(200).json({message: "Inscription réussie.", user: user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//  SIGN IN (Connexion)
module.exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        // Générer un token JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: '7d' });

        res.status(200).json({ message: "Connexion réussie.", token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports.addUserClient = async (req,res) => {
    try {
        const {username , email , password , age} = req.body;
        const roleClient = 'client'
        // if (!checkIfUserExists) {
        //     throw new Error("User not found");
        //   }
        const user = await userModel.create({
            username,email ,password,role :roleClient, age
        })
        res.status(200).json({user});
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
        res.status(500).json({message: error.message});
    }
}


module.exports.addUserAdmin= async (req,res) => {
    try {
        const {username , email , password } = req.body;
        const roleAdmin = 'admin'
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

        res.status(200).json({userListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

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

module.exports.updateuserById = async (req, res) => {
try {
    const {id} = req.params
    const {email , username} = req.body;

    await userModel.findByIdAndUpdate(id,{$set : {email , username }})
    const updated = await userModel.findById(id)

    res.status(200).json({updated})
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