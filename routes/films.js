const mongoose = require('mongoose');
const { Film, validate } = require('../models/film');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const films = await Film.find().sort('name');
  res.send(films);
});

router.get('/:id', async (req, res) => {
  const film = await Film.findById(req.params.id);

  if (!film) return res.status(404).send('Film yang diminta tidak tersedia');

  res.send(film);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let film = new Film({
    name: req.body.name
  });

  film = await film.save();
  res.send(film);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const film = await Film.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!film) return res.status(404).send('Film yang diminta tidak tersedia');

  res.send(film);
});

router.delete('/:id', async (req, res) => {
  const film = await Film.findByIdAndRemove(req.params.id);
  if (!film) return res.status(404).send('Film tidak ditemukan');

  res.send(film);
});

module.exports = router;
