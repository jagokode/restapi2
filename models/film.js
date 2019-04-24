const mongoose = require('mongoose');
const Joi = require('joi');

const Film = mongoose.model(
  'Film',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100
    }
  })
);

function validateFilm(film) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
  };

  return Joi.validate(film, schema);
}

exports.Film = Film;
exports.validate = validateFilm;
