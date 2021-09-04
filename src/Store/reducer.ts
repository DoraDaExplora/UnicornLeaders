import { EActionTypes } from './actionTypes';

interface ResultEntity {
  emails: string[];
  phones: string[];
  contactPersons: string[];
  companyName?: string;
  averageCapitalization?: string;
  reputation?: string;
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
