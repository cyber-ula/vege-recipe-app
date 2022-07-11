// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, recipes: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case 'FETCH_ALL':
      return {
        ...state,
        recipes: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case 'FETCH_BY_SEARCH':
      return { ...state, recipes: action.payload.data };
    case 'FETCH_RECIPE':
      return { ...state, recipe: action.payload.recipe };
    case 'LIKE':
      return { ...state, recipes: state.recipes.map((recipe) => (recipe._id === action.payload._id ? action.payload : recipe)) };
    case 'CREATE':
      return { ...state, recipes: [...state.recipes, action.payload] };
    case 'UPDATE':
      return { ...state, recipes: state.recipes.map((recipe) => (recipe._id === action.payload._id ? action.payload : recipe)) };
    case 'DELETE':
      return { ...state, recipes: state.recipes.filter((recipe) => recipe._id !== action.payload) };
    default:
      return state;
  }
};