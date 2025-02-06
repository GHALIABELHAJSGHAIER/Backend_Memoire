const mongoose = require('mongoose'); //imporyit mongoose
//cofiguration mongoose
module.exports.connectToMongoDb = async () => { //module.exports y3ni exportitha nimchi lil app.js n'importiha
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MongDb_Url)
    .then(
        () => {console.log('Connected to MongoDB') }
    )
    .catch((err) => {
        console.log(err);
    });
};