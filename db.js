const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://namanvarshney:9Mmrq5JRf9ElvvNl@webappcluster.xmbsrav.mongodb.net/test";

const connectToMongo = () =>{
    mongoose.connect(mongoURI);
    console.log("Connected Successfully !!");
}

module.exports = connectToMongo;