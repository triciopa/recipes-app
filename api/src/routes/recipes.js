const router = require('express').Router();
const axios = require('axios');
const { Sequelize } = require('sequelize');
const { Recipe, Diet } = require('../db.js');
const { API_KEY } = process.env;

router.get('/', async (req, res) => {
  // console.log('Query', req.query);

  const getData = async () => {
    const request = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    let filtered = await request.data.results.filter((elem) =>
      elem.title.includes(req.query.name)
    );
    const newArray = await filtered.map((elem) => {
      return {
        id: elem.id * -1,
        title: elem.title,
        image: elem.image,
        spoonacularScore: parseInt(elem.spoonacularScore),
        diets: elem.diets.map((diet) => {
          return { name: diet };
        }),
      };
    });
    return newArray;
  };

  try {
    if (req.query) {
      const dataRequired = {};
      const name = req.query.name;
      let search = await Recipe.findAll({
        attributes: ['id', 'title', 'image', 'spoonacularScore'],
        where: {
          title: { [Sequelize.Op.like]: `%${name}%` },
        },
        include: {
          model: Diet,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      });

      search[0]
        ? (dataRequired['results'] = search)
        : (dataRequired['results'] = []);

      const apiData = await getData();

      // console.log(apiData[0]);

      // adfadfa; // PROBAR ERROR 500 ---- descomentar

      apiData[0]
        ? (dataRequired.results = dataRequired.results.concat(apiData)) &&
          res.json(dataRequired)
        : dataRequired.results[0]
        ? res.json(dataRequired)
        : res.status(404).json({
            results: {
              error: 'No se encontraron datos que coincidan con la búsqueda',
            },
          });
    } // ----------------- IF END
  } catch (err) {
    console.log(err);
    res.status(500).json({
      results: {
        error: 'Error de servidor, probablemente hayas consumido tus créditos',
      },
    });
  }
});

router.get('/:idRecipe', async (req, res) => {
  let id = req.params.idRecipe;

  try {
    if (id > 0) {
      const search = await Recipe.findOne({
        where: {
          id: req.params.idRecipe,
        },
        include: {
          model: Diet,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      });

      res.json(search);
    } else {
      const request = await axios.get(
        `https://api.spoonacular.com/recipes/${Math.abs(
          id
        )}/information?apiKey=${API_KEY}`
      );
      const obj = {
        title: request.data.title,
        summary: request.data.summary,
        spoonacularScore: parseInt(request.data.spoonacularScore),
        healthScore: parseInt(request.data.healthScore),
        instructions: request.data.instructions,
        image: request.data.image,
        diets: request.data.diets,
        diets: request.data.diets.map((diet) => {
          return { name: diet };
        }),
      };
      res.json(obj);
    }
  } catch (err) {
    // console.log(err);
    res.status(500).send('Error de servidor');
  }
});

module.exports = router;
