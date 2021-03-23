/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const chai = require('chai');
// const chai = require('chai').use(require('chai-as-promised'));
const session = require('supertest-session');
const supertest = require('supertest');
const app = require('../../src/app.js');
const { Recipe, Diet, conn } = require('../../src/db.js');
// const should = chai.should();

const agent = session(app);
const recipe = {
  title: 'Milanesa de cangrejo',
  summary: 'Es una milanesa muy particular, es de cangrejo',
  spoonacularScore: 90,
  healthScore: 70,
  instructions: 'Se hace poniendo huevo y pan rallado a carne de cangrejo',
  image: 'URL',
};

async function setRelations() {
  const dietsDB = await Diet.findAll({
    where: {
      name: {
        [Sequelize.Op.in]: ['primal', 'pescatarian'],
      },
    },
  });
  await recipe.setDiets(dietsDB);
}

setRelations();

const recipe2 = {
  title: 'Milanesa de cangrejo',
  summary: 'Es una milanesa muy particular, es de cangrejo',
  spoonacularScore: 90,
  healthScore: 70,
  instructions: 'Se hace poniendo huevo y pan rallado a carne de cangrejo',
  image: 'URL',
  diets: ['primal', 'pescatarian'],
};

describe('Recipe routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => {
      Recipe.create(recipe);
    })
  );
  describe('GET /recipes', () => {
    it('should get 200', () => agent.get('/recipes?name=').expect(200));
    it('should get 404 if query is not specified', () =>
      agent.get('/recipes').expect(404));
  });
  describe('GET /diets', () => {
    it('should get 200', () => agent.get('/diets').expect(200));
  });
  describe('GET /recipes/:id', () => {
    it('should get 200', () => agent.get('/recipes/1').expect(200));
    it('should get 500 if ID is 0', () => agent.get('/recipes/0').expect(500));
    it('should get 500 if ID is not a number', () =>
      agent.get('/recipes/ladsjf').expect(500));
  });
  describe('POST /recipe', (done) => {
    // let isValid = function (res) {
    //   console.log(res.body);
    //   let body = res.body;
    //   body.to.be.a('title');
    // };

    it('should get 200', () => agent.post('/recipe').send(recipe2).expect(200));
    it('should get an object as response', () =>
      agent
        .post('/recipe')
        .send(recipe2)
        .expect((res) =>
          (function () {
            if (typeof res.body === 'object') {
              return;
            } else {
              throw new Error('This is not OK');
            }
          })()
        ));
  });
});
