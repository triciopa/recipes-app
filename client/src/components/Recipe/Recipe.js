import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { getRecipes } from '../../actions/index';
import './Recipe.css';

export const Recipe = (props) => {
  useEffect(() => {
    if (props.recipe.summary) {
      let summary = props.recipe.summary;
      document.getElementById('summary').innerHTML = summary;
    }
    if (props.recipe.instructions) {
      let instructions = props.recipe.instructions;
      document.getElementById('description').innerHTML = instructions;
    }
    return () => {};
  }, [props.recipe]);

  return (
    <div id="recipeComponent">
      <div className="container">
        <h1 className="title">{props.recipe.title || 'Title'}</h1>
        <span className="scores">
          <strong>Overall: </strong>
          {props.recipe.spoonacularScore || 'Score'}
        </span>
        <span className="scores">
          <strong>Health: </strong>
          {props.recipe.healthScore || 'Health score'}
        </span>
        <img
          src={
            props.recipe.image ||
            'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg'
          }
          alt="imagen sin cargar"
        ></img>
        <div className="summary">
          <h3>Summary</h3>
          <p id="summary">
            Elit in eu culpa ex qui enim consectetur incididunt ex adipisicing
            proident sit eiusmod consectetur. Nostrud qui fugiat minim aliquip
            amet culpa ea deserunt reprehenderit nulla officia anim. Dolor qui
            quis elit cupidatat consequat sunt cupidatat non voluptate. Laboris
            adipisicing voluptate nostrud nisi culpa consectetur. Eu non duis
            labore dolor veniam quis sint.
          </p>
        </div>
        <div className="description">
          <h3>Instructions step-by-step</h3>
          <p id="description">
            Elit in eu culpa ex qui enim consectetur incididunt ex adipisicing
            proident sit eiusmod consectetur. Nostrud qui fugiat minim aliquip
            amet culpa ea deserunt reprehenderit nulla officia anim. Dolor qui
            quis elit cupidatat consequat sunt cupidatat non voluptate. Laboris
            adipisicing voluptate nostrud nisi culpa consectetur. Eu non duis
            labore dolor veniam quis sint.
          </p>
        </div>
      </div>
      <div id="buttons">
        <Link to="/main">
          <button>Go back</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipe: state.single,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//   };
// };

export default connect(mapStateToProps, null)(Recipe);
