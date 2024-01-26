import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter contact name"],
        maxLength: [200, "Product name cannot Exceeds 200 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter contact name"],
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone no"],
    },
    services: [{
        type: String,
        required: [true, "Please select services"],
    }],
    message:{
        type:String,
        required:[false]
    }
}, { timestamps: true });

const contacts = mongoose.model('contacts', contactSchema);

export default contacts;
