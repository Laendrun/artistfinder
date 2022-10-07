const Joi = require('joi');

// artist validation schema
const artistSchema = Joi.object({
  artist_name: Joi.string().min(4).max(30).required(),
  artist_isGroup: Joi.number().min(0).max(1).required(),
  type_id: Joi.number().required(),
  style_id: Joi.number().required(),
});

// category validation schema
const categorySchema = Joi.object({
  category_name: Joi.string().min(4).max(30).required(),
});

// place validation schema
const placeSchema = Joi.object({
  place_name: Joi.string().min(4).max(30).required(),
  place_capacity: Joi.number().required(),
  place_address: Joi.string().min(5).max(100).required(),
  place_postCode: Joi.number().required(),
  place_city: Joi.string().min(5).max(50).required(),
});

// reservation validation schema
const reservationSchema = Joi.object({
  reservation_date: Joi.date().required(),
  reservation_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
  place_id: Joi.number().required(),
  artist_id: Joi.number().required(),
  category_id: Joi.number().required(),
});

// review validation schema
const reviewSchema = Joi.object({
  review_rating: Joi.number().min(0).max(5).required(),
  review_text: Joi.string().min(1).max(140).required(),
  user_id: Joi.number().required(),
  place_id: Joi.number().required(),
  artist_id: Joi.number().required(),
});

// style validation schema
const styleSchema = Joi.object({
  style_name: Joi.string().min(2).max(25).required()
});

// type validation schema
const typeSchema = Joi.object({
  type_name: Joi.string().min(2).max(25).required()
});

// user validation schema
const userSchema = Joi.object({
  user_fname: Joi.string().min(2).max(64).required(),
  user_lname: Joi.string().min(2).max(64).required(),
  user_username: Joi.string().min(2).max(64).required(),
  user_email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
  type_id: Joi.number().required(),
  role_id: Joi.number().required()
});

// post_code validation schema
const post_codeSchema = Joi.object({
  post_code: Joi.number().required()
});

// city validation schema
const citySchema = Joi.object({
  city: Joi.string().min(5).max(50).required()
});

// name validation schema
const nameSchema = Joi.object({
  name: Joi.string().min(2).max(30).required()
});

// id validation schema
const idSchema = Joi.object({
  id: Joi.number().required()
});

// capacity validation schema
const capacitySchema = Joi.object({
  capacity: Joi.number().required()
});

// date validation schema
const dateSchema = Joi.object({
  date: Joi.string().regex(/^([0-9]{4})\-([0-9]{2})\-([0-9]){2}$/)
});

const signupSchema = Joi.object({
  user_fname: Joi.string().min(2).max(64).required(),
  user_lname: Joi.string().min(2).max(64).required(),
  user_email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
  user_password: Joi.string().required(),
  confirm_password:Joi.string().required().valid(Joi.ref('user_password')),
});

module.exports = {
  nameSchema,
  idSchema,
  artistSchema,
  categorySchema,
  placeSchema,
  post_codeSchema,
  citySchema,
  capacitySchema,
  reservationSchema,
  dateSchema,
  reviewSchema,
  styleSchema,
  typeSchema,
  userSchema,
  signupSchema,
}