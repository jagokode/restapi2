const Joi = require('joi');
const films = require('./routes/films');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/films', films);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
