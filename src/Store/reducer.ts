import { EActionTypes } from './actionTypes';

export interface ResultEntity {
  emails: string[];
  phones: string[];
  contact_persons: string[];
  company_name: string;
  average_capitalization: string;
  reputation: string;
}

export interface ResultResponse {
  1?: ResultEntity[];
  2?: ResultEntity[];
}

export interface IMainStore {
  pending: boolean;
  error: null | Error;
  results: ResultEntity[];
}

export const initialState: IMainStore = {
  pending: false,
  error: null,
  results: [],
};

export const reducer = (state: IMainStore = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case EActionTypes.LOAD_RESULTS_REQUEST: {
      return {
        ...state,
        pending: true,
      };
    }

    case EActionTypes.LOAD_RESULTS_SUCCESS: {
      return {
        ...state,
        results: payload,
        pending: false,
      };
    }

    case EActionTypes.LOAD_RESULTS_FAILURE: {
      return {
        ...state,
        pending: false,
        error: payload,
      };
    }

    default:
      return state;
  }
};
