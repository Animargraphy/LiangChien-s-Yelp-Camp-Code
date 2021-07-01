const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// just to shorten the case like "mongoose.Schema.type.asdsaf" into "Schema.type.asdsaf"

const CampgroundSchema = new Schema({
    title: String,
    Price: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground',CampgroundSchema)
