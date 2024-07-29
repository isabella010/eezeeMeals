const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    quantity: { type: Number, default: 1 },
    stock: Boolean // 2/19
});
const collectionName = 'allMeals';

const myDB = mongoose.connection.useDb('meals');
module.exports = myDB.model('food', foodSchema, collectionName)