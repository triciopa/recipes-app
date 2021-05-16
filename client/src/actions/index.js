export const GET_RECIPES = 'GET_RECIPES';
export const SINGLE_PAGE = 'SINGLE_PAGE';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const CHANGE_ORDER = 'CHANGE_ORDER';

//http://localhost:3001

export function getRecipes(name) {
  return function (dispatch) {
    return fetch('/recipes?name=' + name)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch({ type: GET_RECIPES, payload: json.results });
      });
  };
}

export function getSinglePage(id) {
  return function (dispatch) {
    return fetch('/recipes/' + id)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: SINGLE_PAGE, payload: json });
      });
  };
}

export function filterByDiet(payload) {
  return {
    type: FILTER_BY_DIET,
    payload: payload,
  };
}

export function changeOrder(ascOrDesc) {
  return {
    type: CHANGE_ORDER,
    payload: ascOrDesc,
  };
}

export function getDiets() {
  return function (dispatch) {
    return fetch('/diets')
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_DIETS, payload: json });
      });
  };
}
