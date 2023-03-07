const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://namanvarshney:9Mmrq5JRf9ElvvNl@webappcluster.xmbsrav.mongodb.net/notekeeper";

const connectToMongo = () =>{
    mongoose.connect(mongoURI);
}

module.exports = connectToMongo;