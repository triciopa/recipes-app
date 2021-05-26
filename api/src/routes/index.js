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

// server.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build/index.html'));
// });

router.get('/', async (req, res) => {
  res.send('Server OK');
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
