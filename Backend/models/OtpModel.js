const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    customerUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    merchantUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant',
    },
    code: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: '30m' }, // Set an expiry time (e.g., 30 minutes)
    },
},{
    timestamps: true,
    collection: "Otps",
});

const Otp = mongoose.model('Otp', OtpSchema);

module.exports = Otp;