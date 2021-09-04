import { EActionTypes } from './actionTypes';
// import api from '../Api';

export const loadResults = (searchData: any) => async (dispatch: any) => {
  dispatch({ type: EActionTypes.LOAD_RESULTS_REQUEST });
  try {
    console.log(searchData);
    // const res = await api.search(searchData);
    setTimeout(() => {
      const res = {
        '1': [
          {
            emails: ['qwe@qwe.qwe'],
            phones: [88005553535],
            company_name: 'Рога и Копыта',
            contact_persons: 'Кекыч',
            average_capitalization: '100000000000 RUB',
            reputation: 'Недобросовестная',
          },
          {
            emails: ['qwe@qwe.qwe'],
            phones: [88005553535],
            company_name: 'Рога и Копыта',
            contact_persons: 'Кекыч',
            average_capitalization: '100000000000 RUB',
            reputation: 'Недобросовестная',
          },
          {
            emails: ['qwe@qwe.qwe'],
            phones: [88005553535],
            company_name: 'Рога и Копыта',
            contact_persons: 'Кекыч',
            average_capitalization: '100000000000 RUB',
            reputation: 'Недобросовестная',
          },
        ],
        '2': [
          {
            emails: ['qwe@qwe.qwe'],
            phones: [88005553535],
            company_name: 'Рога и Копыта',
            contact_persons: 'Кекыч 2',
            average_capitalization: '100000000000 RUB',
            reputation: 'Недобросовестная',
          },
          {
            emails: ['qwe@qwe.qwe'],
            phones: [88005553535],
            company_name: 'Рога и Копыта',
            contact_persons: 'Кекыч 2',
            average_capitalization: '100000000000 RUB',
            reputation: 'Недобросовестная',
          },
          {
            emails: ['qwe@qwe.qwe'],
            phones: [88005553535],
            company_name: 'Рога и Копыта',
            contact_persons: 'Кекыч 2',
            average_capitalization: '100000000000 RUB',
            reputation: 'Недобросовестная',
          },
        ],
      };
      dispatch({ type: EActionTypes.LOAD_RESULTS_SUCCESS, payload: res });
    }, 2000);
  } catch (err) {
    console.error(err);
    dispatch({ type: EActionTypes.LOAD_RESULTS_FAILURE, payload: err });
  }
};
