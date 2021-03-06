import { ActionTypes } from '../actionTypes/actionTypes';

const initialState = {
  movies: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MOVIES:
      return { ...state, movies: action.payload };
    default:
      return state;
  }
};

export default moviesReducer;
