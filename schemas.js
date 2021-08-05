const Joi = require('joi');
const { number } = require('Joi');
// if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400)
// basic logic to see if req.body contains campground
module.exports.campgroundSchema = Joi.object({
    // it's not a mongo schema. it validate the data before we send it to mongo
    // check joi.object from its document https://joi.dev/api/?v=17.4.1
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})