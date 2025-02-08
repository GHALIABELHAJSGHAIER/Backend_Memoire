
const os = require('os'); //importit os
 //cofiguration os


 module.exports.esmfonction = async (req,res) => { //module.exports y3ni exportitha nimchi lil app.js n'importiha
   try{
  
    res.status(200).json({});
   }catch(error){
    res.status(500).json({message: error.message});
   }
 }
 

 module.exports.getOsInformation = async (req,res) => { //module.exports y3ni exportitha nimchi lil app.js n'importiha
    try{
       
        const osInformation = {
            hostname : os.hostname(),
            type : os.type(),
            platform : os.platform(),
        } 
            //res.json('getOsInformation ');
     res.status(200).json({getOsInformation});
    }catch(error){
     res.status(500).json({message: error.message});
    }
  }

 /**
  * bech nab9a  dima ni5dim bih 
const os = require('os'); //imporyit os
 //cofiguration os
 module.exports.getOsInformation = async (req,res) => { //module.exports y3ni exportitha nimchi lil app.js n'importiha
   try{
    res.status(200).json({});
   }catch(error){
    res.status(500).json({message: error.message});
   }
 }
 
  */