const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://snehajais03:snehajais03@cluster0.eqhptmu.mongodb.net/snapPay")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 255
    }
}, {timestamps: true}); //creates a createdAt and updatedAt field on our models that contain timestamps which will get automatically updated when our model changes. 

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema); //registers our schema with mongoose.
const Account = mongoose.model('Account', accountSchema);

module.exports = { User, Account };
