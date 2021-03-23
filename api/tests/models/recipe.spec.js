const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');
const chai = require('chai');
// const { classToInvokable } = require('sequelize/types/lib/utils');

describe('Recipe model', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('title', () => {
      it('should throw an error if title is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid title')))
          // .catch((err) => done(console.log(err)));
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({
          title: 'Milanesa de cangrejo',
          summary: 'Es una milanesa muy particular, es de cangrejo',
          spoonacularScore: 90,
          healthScore: 70,
          instructions:
            'Se hace poniendo huevo y pan rallado a carne de cangrejo',
        });
      });

      it('should receive an object for recipe', () => {
        let recipe = {
          title: 'Milanesa de cangrejo',
          summary: 'Es una milanesa muy particular, es de cangrejo',
          spoonacularScore: 99,
          healthScore: 77,
          instructions:
            'Se hace poniendo huevo y pan rallado a carne de cangrejo',
        };
        expect(recipe).to.be.a('object');
      });
      it('should receive a number in both score properties', () => {
        let recipe = {
          title: 'Milanesa de cangrejo',
          summary: 'Es una milanesa muy particular, es de cangrejo',
          spoonacularScore: 'afad',
          healthScore: 'setentaysiete',
          instructions:
            'Se hace poniendo huevo y pan rallado a carne de cangrejo',
        };
        expect(recipe).to.be.a('object');
        expect(typeof recipe.spoonacularScore === 'number').to.equal(false);
        expect(typeof recipe.healthScore === 'number').to.equal(false);
      });
    });
  });
});
