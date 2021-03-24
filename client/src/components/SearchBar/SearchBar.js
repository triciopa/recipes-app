import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getRecipes,
  getSinglePage,
  changeOrder,
  getDiets,
  filterByDiet,
} from '../../actions';
import './SearchBar.css';

export const SearchBar = (props) => {
  const [state, setState] = useState({ title: '' });
  const [page, setPage] = useState(1);
  const [elemsPerPage, setElemsPerPage] = useState(9);
  const [wrongNumber, setWrongNumber] = useState(false);
  const [display, setDisplay] = useState([]);
  const { title } = state;
  let maxPages, pageButtons;

  if (!props.recipes.error) {
    maxPages = Math.ceil(props.recipes.length / elemsPerPage);
    pageButtons = Array(maxPages);
    for (let i = 0; i < pageButtons.length; i++) {
      pageButtons[i] = i;
    }
  }

  useEffect(() => {
    props.getDiets();
    if (!props.recipes.error) {
      let displayElements = props.recipes.slice(
        elemsPerPage * (page - 1),
        elemsPerPage * page
      );
      setDisplay(displayElements);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, elemsPerPage, wrongNumber, props.recipes]);

  const handleChange = (e) => {
    e.preventDefault();
    setState({ title: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    props.getRecipes(title);
  };
  const handleClick = (diet) => {
    props.filterByDiet(diet);
    setPage(1);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setPage(1);
    props.changeOrder(e.target.value);
  };

  const handlePageButton = (e) => {
    e.target.name === 'PREV' && page > 1
      ? setPage(page - 1)
      : e.target.name === 'NEXT' && page < maxPages
      ? setPage(page + 1)
      : alert('No hay más páginas');
  };

  const handleInput = (e) => {
    if (e.target.value < 3 || e.target.value > 10) {
      setWrongNumber(true);
    } else {
      setWrongNumber(false);
      setPage(1);
      setElemsPerPage(e.target.value);
    }
  };
  return (
    <div className="content">
      <h2>Foodie's paradise</h2>
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            id="recipeTitle"
            autoComplete="off"
            value={title}
            placeholder="Find your recipes..."
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">🔍</button>
        <button>
          <Link to="/create">➕</Link>
        </button>
      </form>
      <div id="controls">
        <div id="dietTypes">
          {props.recipes.length ? <label>Diet types: </label> : null}
          {props.recipes.length
            ? props.diets.map((diet, i) => (
                <button
                  className="dietBtn"
                  key={`${diet}${i}`}
                  onClick={() => handleClick(diet)}
                >
                  {diet.toUpperCase()}
                </button>
              ))
            : null}
        </div>
        <div id="elementsPerPage">
          {props.recipes.length ? <label>Elements per Page: </label> : null}
          {props.recipes.length ? (
            <input
              type="number"
              placeholder={elemsPerPage}
              min="3"
              max="10"
              onChange={(e) => handleInput(e)}
            ></input>
          ) : null}
          {wrongNumber && <p>Choose between 3 and 10</p>}
          <span>
            {props.recipes.length
              ? props.recipes.length + ' results'
              : '0 results'}
          </span>
        </div>

        <div id="resultOrder">
          {props.recipes.length ? <label>Result order: </label> : null}
          {props.recipes.length ? (
            <select name="select" onChange={(e) => handleSelect(e)}>
              <option value="order">CHANGE ORDER</option>
              <option value="asc">Ascending(A-z)</option>
              <option value="desc">Descending(z-A)</option>
              <option value="max">Higher scores</option>
              <option value="min">Lower scores</option>
            </select>
          ) : null}
        </div>
      </div>
      <div id="resultsBoard">
        <ul>
          {props.recipes.error ? (
            <h4>{props.recipes.error}</h4>
          ) : (
            display &&
            display.map((recipe) => (
              <li key={recipe.title} id={`recipe${recipe.id}`}>
                {recipe.id && (
                  <div>
                    <h4>
                      <Link
                        to={`/recipe/${Math.abs(recipe.id)}`}
                        onClick={() => props.getSinglePage(recipe.id)}
                      >
                        {recipe.title}
                      </Link>
                    </h4>
                    <img src={recipe.image} alt="Imagen sin cargar..." />
                    <div className="dietsList">
                      {recipe.diets.map((diet, i) => {
                        return (
                          <p key={`${recipe.id}-${diet.name}`}>{diet.name}</p>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
      <div id="pageButtons">
        {props.recipes && props.recipes.length ? (
          <button
            name="PREV"
            className="controlBtn"
            onClick={(e) => {
              handlePageButton(e);
            }}
          >
            PREV
          </button>
        ) : null}
        {pageButtons &&
          pageButtons.map((elem, i) => (
            <button
              className="pageBtn"
              key={`pageButton${i}`}
              onClick={() => setPage(i + 1)}
            >
              Página {i + 1}
            </button>
          ))}
        {props.recipes && props.recipes.length ? (
          <button
            name="NEXT"
            className="controlBtn"
            onClick={(e) => {
              handlePageButton(e);
            }}
          >
            NEXT
          </button>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.list,
    diets: state.diets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipes: (recipe) => dispatch(getRecipes(recipe)),
    getSinglePage: (id) => dispatch(getSinglePage(id)),
    getDiets: () => dispatch(getDiets()),
    changeOrder: (order) => dispatch(changeOrder(order)),
    filterByDiet: (diet) => dispatch(filterByDiet(diet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
