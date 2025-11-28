// Import Mongoose for MongoDb object
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
// Defines the schema for the User collection
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  displayName: String
});

userSchema.plugin(passportLocalMongoose);

// Creates the User Model 
const User = mongoose.model('User', userSchema);

module.exports = { User };
