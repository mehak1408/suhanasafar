const mongoose = require("mongoose")

const emergencyContactSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    name: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["Police", "Fire", "Ambulance", "Other"], 
        default: "Other" 
    },
},{timestamps:true})

module.exports = mongoose.model("EmergencyContact",emergencyContactSchema)