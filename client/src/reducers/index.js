const {
  GET_RECIPES,
  SINGLE_PAGE,
  GET_DIETS,
  FILTER_BY_DIET,
  CHANGE_ORDER,
} = require('../actions');

const initialState = {
  list: [],
  diets: [],
  single: {},
};

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES: {
      // -------------------------------------------- DONE
      return {
        ...state,
        list: action.payload,
      };
    }
    case SINGLE_PAGE: {
      // -------------------------------------------- DONE
      return {
        ...state,
        single: action.payload,
      };
    }
    case GET_DIETS: {
      // -------------------------------------------- DONE
      let filter = action.payload.map((diet) => {
        return diet.name;
      });
      return {
        ...state,
        diets: filter,
      };
    }
    case FILTER_BY_DIET: {
      // -------------------------------------------- DONE
      let array = [];
      for (let i = 0; i < state.list.length; i++) {
        const recipe = state.list[i];
        for (let j = 0; j < recipe.diets.length; j++) {
          const diet = recipe.diets[j];
          if (diet.name === action.payload) {
            array.push(recipe);
          }
        }
      }
      return {
        ...state,
        list: [...array],
      };
    }
    case CHANGE_ORDER: {
      // -------------------------------------------- DONE
      let array = [...state.list];

      if (action.payload === 'asc') {
        array.sort(asc);
        return {
          ...state,
          list: [...array],
        };
      } else if (action.payload === 'desc') {
        array.sort(desc);
        return {
          ...state,
          list: [...array],
        };
      } else if (action.payload === 'max') {
        array.sort(maxToMin);
        return {
          ...state,
          list: [...array],
        };
      } else if (action.payload === 'min') {
        array.sort(minToMax);
        return {
          ...state,
          list: [...array],
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}

function asc(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

function desc(a, b) {
  if (a.title < b.title) {
    return 1;
  }
  if (a.title > b.title) {
    return -1;
  }
  return 0;
}

function minToMax(a, b) {
  return a.spoonacularScore - b.spoonacularScore;
}

function maxToMin(a, b) {
  return b.spoonacularScore - a.spoonacularScore;
}

export default mainReducer;
