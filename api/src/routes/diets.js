const router = require('express').Router();
const { diets } = require('pg');
// const axios = require('axios');
// const { API_KEY } = process.env;
const { Sequelize } = require('sequelize');
const { Diet } = require('../db.js');

router.get('/', async (req, res) => {
  res.send(await Diet.findAll());
});

// router.get('/:idRecipe', async (req, res) => {
//   let search = await recipe_diets.findAll({
//     where: {
//       recipeId: req.params.idRecipe,
//     },
//   });
//   let array = []; // 3,4 6
//   search.map((elem) => array.push(elem.dietId));
//   console.log(array);

//   let object = {
//     result: [],
//   };

//   for (let i = 0; i < array.length; i++) {
//     const diet = array[i];
//     let element = await Diet.findByPk(diet);
//   }

//   const mapping = array.map(async (elem) => {
//     let element = await Diet.findByPk(elem);
//     console.log(element.dataValues.name); // object.result.push(element.dataValues.name);
//     // console.log(object);
//     await element.dataValues.name;
//   });

//   console.log(mapping);

//   res.send(mapping);
// });

module.exports = router;
