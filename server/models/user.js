const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const {ObjectId} = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        index: true,
    },
    role: {
        type: String,
        default: 'subscriber',
    },
    cart: {
        type: Array,
        default: [],
    },
    address: String,
    wishlist: [{type: ObjectId, ref: "Product"}],
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)