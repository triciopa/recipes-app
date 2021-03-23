const { Sequelize } = require('sequelize');
const { Recipe, Diet } = require('../db.js');
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;

const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRouter = require('./recipes');
const dietRouter = require('./diets');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipeRouter);
router.use('/diets', dietRouter);

router.get('/', async (req, res) => {
  // const getData = async () => {
  //   const request = await axios.get(
  //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  //   );
  //   return request.data.results;
  // };

  // let data = await getData();

  // for (let i = 0; i < data.length; i++) {
  //   const element = data[i];
  //   let instructions = '';
  //   if (element.analyzedInstructions[0]) {
  //     let steps = element.analyzedInstructions[0].steps;
  //     for (let i = 0; i < steps.length; i++) {
  //       const string = steps[i].step;
  //       instructions = instructions + string;
  //     }
  //   } else {
  //     instructions = null;
  //   }
  //   const newRecipe = await Recipe.findOrCreate({
  //     where: {
  //       title: element.title,
  //     },
  //     defaults: {
  //       summary: element.summary,
  //       score: element.spoonacularScore,
  //       health: element.healthScore,
  //       instructions: instructions,
  //       spoonId: element.id,
  //       image: element.image,
  //     },
  //   });

  //   const diestDB = await Diet.findAll({
  //     where: {
  //       name: {
  //         [Sequelize.Op.in]: element.diets,
  //       },
  //     },
  //   });
  //   await newRecipe[0].setDiets(dietsDB);
  // } // ----- FOR END

  console.log('Base de datos cargada');
  res.send('OK');
});

router.post('/recipe', async (req, res) => {
  let { title, summary, score, health, instructions, image, diets } = req.body;

  const recipe = await Recipe.create({
    title,
    summary,
    spoonacularScore: score,
    healthScore: health,
    instructions,
    image,
  });

  if (!Array.isArray(diets)) {
    diets = [diets];
  }
  const dietsDB = await Diet.findAll({
    where: {
      name: {
        [Sequelize.Op.in]: diets,
      },
    },
  });

  await recipe.setDiets(dietsDB);
  res.json(recipe);
});

module.exports = router;
