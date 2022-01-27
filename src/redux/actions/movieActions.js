import { ActionTypes } from '../actionTypes/actionTypes';

export const setMovies = movies => {
  return {
    type: ActionTypes.FETCH_MOVIES,
    payload: movies,
  };
};
