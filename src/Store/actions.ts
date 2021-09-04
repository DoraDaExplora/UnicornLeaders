import { EActionTypes } from './actionTypes';

export const loadResults = () => async (dispatch: any) => {
  dispatch({ type: EActionTypes.LOAD_RESULTS_REQUEST });
  try {
    dispatch({ type: EActionTypes.LOAD_RESULTS_SUCCESS, payload: [] });
  } catch (err) {
    console.error(err);
    dispatch({ type: EActionTypes.LOAD_RESULTS_FAILURE, payload: err });
  }
};
