const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type:Number,
        required:true
    },
    transactionType:{
        type: String,
        enum:['withdraw','deposit'],
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
},{timestamps:true});

const Transaction = mongoose.model('Transaction', transactionSchema);