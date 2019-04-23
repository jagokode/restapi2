const express = require('express');
const router = express.Router();

const films = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' }
];

router.get('/', (req, res) => {
  res.send(films);
});

router.post('/', (req, res) => {
  const { error } = validateFilm(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const film = {
    id: films.length + 1,
    name: req.body.name
  };

  films.push(film);
  res.send(films);
});

router.put('/:id', (req, res) => {
  const film = films.find(film => film.id === parseInt(req.params.id));
  if (!film) return res.status(404).send('Film yang diminta tidak tersedia');

  const { error } = validateFilm(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  film.name = req.body.name;
  res.send(films);
});

router.delete('/:id', (req, res) => {
  const film = films.find(film => film.id === parseInt(req.params.id));
  if (!film) return res.status(404).send('Film tidak ditemukan');

  const index = films.indexOf(film);
  films.splice(index, 1);

  res.send(films);
});

function validateFilm(film) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
  };

  return Joi.validate(film, schema);
}

module.exports = router;
