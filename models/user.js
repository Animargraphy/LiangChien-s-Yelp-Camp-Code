const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
// check more at https://www.npmjs.com/package/passport-local-mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
        // a reminder saying that it is not considered actually a validation and it sets up an index.
    }
});

UserSchema.plugin(passportLocalMongoose);
// inside it, a username, has and salt field is added in order to store the username, the hashed password, and the salt value 

module.exports = mongoose.model('User', UserSchema);