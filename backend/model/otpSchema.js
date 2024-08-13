const mongoose = require("mongoose");


const { ObjectId } = mongoose.Schema.Types;

const otpSchema = new mongoose.Schema(
    {
        otp: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        userId: {
            type: ObjectId,
            required: true,
            ref: "Users",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);




const OtpModel = mongoose.model("OTPs", otpSchema);

module.exports = OtpModel;