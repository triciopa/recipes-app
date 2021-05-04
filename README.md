# Individual Project - Food recipes browser

<p align="center">
  <img height="200" src="https://spoonacular.com/application/frontend/images/food-api/dough.jpg" />  
</p>

>**Video URL:** https://www.youtube.com/watch?v=zNpAxib4T9Y

## Main features

### Web Application based in:
- React.js and Redux.js (Front-end)
- Node.js and Express.js (Back-end)
- PostgreSQL & Sequelize (Database).

### Objectives
- Apply best practices.
- Learn to handle the Git workflow.
- Learn and use testing.

### Functionalities
 - Search for recipes
 - Filter by diet 
  - Crear nuevas recetas propias

### API

This project has its own database, nevertheless it consumes also an external API: [Spoonacular](https://spoonacular.com/food-api)

  * GET https://api.spoonacular.com/recipes/complexSearch
  * GET https://api.spoonacular.com/recipes/{id}/information

## Structure

### Technologies
- [ ] React.js
- [ ] Redux.js
- [ ] CSS
- [ ] Express.js
- [ ] Node.js
- [ ] PostgreSQL
- [ ] Sequelize
- [ ] Mocha, Chai & Enzyme

### Frontend

* Landing Page
* Search Bar
* Catalogue (with filters, order and pagination)
* Recipe detail template
* Creation form

### Testing
* Mocha
* Chai
* Supertest
* Enzyme
* Chai-enzyme
* Redux Mock store


## How to use

1. Sign up in Spoonacular to retrieve an [API Key](https://spoonacular.com/food-api/console#Dashboard)
2. Create a SQL database named "food".
3. Create an .env file inside /api with the following:
```js
DB_USER=[your_user]
DB_PASSWORD=[your_pass]
DB_HOST=localhost
API_KEY=[spoonacular_api_key]
```
4. Install node modules with "npm i" in both directories /api and /client.
5. Start both with "npm start"
