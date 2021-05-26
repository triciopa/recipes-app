const router = require('express').Router();
const { diets } = require('pg');
const { Sequelize } = require('sequelize');
const { Diet } = require('../db.js');

router.get('/', async (req, res) => {
  res.send(await Diet.findAll());
});

module.exports = router;
