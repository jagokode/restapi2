const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Selamat Datand di Film Mania');
});

module.exports = router;
