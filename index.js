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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
