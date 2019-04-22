const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const films = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' }
];

app.get('/', (req, res) => {
  res.send('Selamat Datand di Film Mania');
});

app.get('/api/films', (req, res) => {
  res.send(films);
});

app.post('/api/films', (req, res) => {
  const { error } = validateFilm(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const film = {
    id: films.length + 1,
    name: req.body.name
  };

  films.push(film);
  res.send(films);
});

app.put('/api/films/:id', (req, res) => {
  const film = films.find(film => film.id === parseInt(req.params.id));
  if (!film) return res.status(404).send('Film yang diminta tidak tersedia');

  const { error } = validateFilm(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  film.name = req.body.name;
  res.send(films);
});

app.delete('/api/films/:id', (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
