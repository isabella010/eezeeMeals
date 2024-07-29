const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: String,
    description: String
});
const collectionName = 'allMeals';

const myDB = mongoose.connection.useDb('meals');
module.exports = myDB.model('food', foodSchema, collectionName)