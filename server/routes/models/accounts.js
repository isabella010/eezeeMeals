const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const collectionName = 'userAccounts'
const accountSchema = new Schema({
 
    account_name:
    {
        type: String,
        required: true
    },
    first_name: 
    {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },
    email: 
    {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart:
    {
        type: Array,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    street:
    {
        type: String,
        required: false
    },
    number:
    {
        type: Number,
        required: false
    },
    unit:
    {
        type: String,
        required: false
    },
    city:
    {
        type: String,
        required: false
    },
    postal:
    {
        type: String,
        required: false
    },
    phone:
    {
        type: Number,
        required: false
    }
});

const myDB = mongoose.connection.useDb('accounts');

module.exports = myDB.model('accounts', accountSchema, collectionName);