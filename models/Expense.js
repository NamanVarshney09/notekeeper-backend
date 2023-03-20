const mongoose = require('mongoose');
const {Schema} = mongoose;

const ExpensesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    tag:{
        type: String,
        default: 'General'
    }    
})

module.exports = mongoose.model('expense',ExpensesSchema);