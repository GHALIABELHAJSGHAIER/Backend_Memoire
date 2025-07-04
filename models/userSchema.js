const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
  telephone: {
    type: String,
    required: true,
    match: [/^\+?[0-9]{8,15}$/, "Please enter a valid phone number"],
  },
    password: {
      type: String,
      required: true,
      minLength: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "client", "infi"],
    },
    user_image: { type: String, require: false, default: "photodeprofile.png" },
    age: {type : Number },
    maisons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Maison" }], // one to many
    appareils: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appareil" }], // one to many
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notification" }], // One-to-Many
    historiques: [{ type: mongoose.Schema.Types.ObjectId, ref: "HistoriqueAction" }], // One-to-Many


    etat:Boolean,

    count: {type : Number, default:'0'}
  },
  { timestamps: true }

 

);

// userSchema.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt();
//     const user = this;
//     user.password = await bcrypt.hash(user.password, salt);
//     user.etat = false ;
//     user.count = user.count + 1;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });
userSchema.pre("save", async function (next) {
  try {
    const user = this;

    // Vérifie si le mot de passe a été modifié
    if (user.isModified('password')) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Initialisation de valeurs si nécessaire
    if (user.isNew) {
      user.etat = false;
      user.count = 1; // pas += 1 car user.count peut être undefined
    }

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.post("save", async function (req, res, next) {
  console.log("new user was created & saved successfully");
  next();
});
userSchema.statics.login = async function (email, password) {
  //console.log(email, password);
  const user = await this.findOne({ email });
  //console.log(user)
  if (user) {
    const auth = await bcrypt.compare(password,user.password);
    //console.log(auth)
    if (auth) {
      // if (user.etat === true) {
      //   if (user.ban === false) {
          return user;
      //   } else {
      //     throw new Error("ban");
      //   }
      // } else {
      //   throw new Error("compte desactive ");
      // }
    } else {
      throw new Error("password invalid"); 
    }
  } else {
    throw new Error("email not found");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;

// const mongoose = require('mongoose');
// const bcrypt =require('bcrypt');

// const { Schema } = mongoose;

// const userSchema = new Schema({
//     username : {
//         type : String,
//     },
//     // phone : {
//     //     type : String,
//     // },
  
//     email : {
//         type : String,
//         lowercase : true,
//         required : true,
//         unique : true,
//     },
//     password : {
//         type : String,
//         required : true,
//     }
// });

// userSchema.pre('save',async function(){
//     try {
//         var user =this;
//         const salt= await bcrypt.genSalt(10);
//         const hashpass = await bcrypt.hash(user.password,salt);
//         user.password=hashpass;
//     } catch (error) {
//         throw error;
//     }
// });

// userSchema.methods.comparePassword = async function(userPassword){
//     try {
//         const isMatch = await bcrypt.compare(userPassword,this.password);
//         return isMatch;
//     } catch (error) {
//         throw error;
//     }
// }
// const User = mongoose.model('user', userSchema);

// module.exports=User;