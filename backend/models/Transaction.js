const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        stockSymbol: {
            type: String,
            required: [true, 'Please add a stock symbol'],
            uppercase: true,
        },
        type: {
            type: String,
            enum: ['buy', 'sell'],
            required: [true, 'Please specify buy or sell'],
        },
        quantity: {
            type: Number,
            required: [true, 'Please add quantity'],
            min: 1,
        },
        price: {
            type: Number,
            required: [true, 'Please add transaction price'],
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Transaction', transactionSchema);
