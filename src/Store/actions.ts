import { EActionTypes } from './actionTypes';
import { ResultEntity, ResultResponse } from './reducer';
// import api from '../Api';

export const loadResults = (searchData: any) => async (dispatch: any) => {
  dispatch({ type: EActionTypes.LOAD_RESULTS_REQUEST });
  try {
    // const res = await api.search(searchData);
    setTimeout(() => {
      const res = {
        '2': [
          {
            emails: ['uig53846@mail.ru'],
            phones: ['79516155806'],
            contact_persons: ['Милешина Анна Валерьевна'],
            company_name: 'Милешина Анна Валерьевна',
            average_capitalization: '0',
            reputation: 'Хорошая',
          },
          {
            emails: ['ipgulzada@bk.ru'],
            phones: ['78552707938'],
            contact_persons: ['Вакаров Василий Иванович'],
            company_name: 'Вакаров Василий Иванович',
            average_capitalization: '0',
            reputation: 'Хорошая',
          },
          {
            emails: ['2014-shabnam@mail.ru'],
            phones: ['79274224004'],
            contact_persons: ['Саидганиев Хаким Камолович'],
            company_name: 'Саидганиев Хаким Камолович',
            average_capitalization: '0',
            reputation: 'Хорошая',
          },
          {
            emails: ['cukcuelena@mail.ru'],
            phones: ['8-917-9396490'],
            contact_persons: ['Ирдуганова Елена Тимеряновна'],
            company_name: 'Ирдуганова Елена Тимеряновна',
            average_capitalization: '9420',
            reputation: 'Хорошая',
          },
          {
            emails: ['ilmas300@mail.ru'],
            phones: ['7-843-2787744'],
            contact_persons: ['Гиззатуллин Марсель Ильясович'],
            company_name: 'Гиззатуллин Марсель Ильясович',
            average_capitalization: '0',
            reputation: 'Хорошая',
          },
          {
            emails: ['toledo-m@mail.ru'],
            phones: ['88435247715'],
            contact_persons: ['Газизов Ильшат Мансурович'],
            company_name: 'Газизов Ильшат Мансурович',
            average_capitalization: '0',
            reputation: 'Хорошая',
          },
          {
            emails: ['000_koloss@mail.ru'],
            phones: ['79990572447'],
            contact_persons: ['Ефименко Анатолий Васильевич'],
            company_name: 'Ефименко Анатолий Васильевич',
            average_capitalization: '198000',
            reputation: 'Хорошая',
          },
          {
            emails: ['primagro@bk.ru'],
            phones: ['79147033655'],
            contact_persons: ['Моисеенкова Александра Валерьевна'],
            company_name: 'Моисеенкова Александра Валерьевна',
            average_capitalization: '207900',
            reputation: 'Хорошая',
          },
          {
            emails: ['yulia83_83_07@mail.ru'],
            phones: ['791-479-15318'],
            contact_persons: ['Чуприн Виктор Владимирович'],
            company_name: 'Чуприн Виктор Владимирович',
            average_capitalization: '242000',
            reputation: 'Хорошая',
          },
          {
            emails: ['intermark-prod@yandex.ru'],
            phones: ['+79084468826'],
            contact_persons: ['Спиридонов Марк Викторович'],
            company_name: 'Спиридонов Марк Викторович',
            average_capitalization: '253000',
            reputation: 'Хорошая',
          },
          {
            emails: ['lidert888@mail.ru'],
            phones: ['74234264131'],
            contact_persons: ['Коваленко Ольга Алексеевна'],
            company_name: 'Коваленко Ольга Алексеевна',
            average_capitalization: '264000',
            reputation: 'Хорошая',
          },
          {
            emails: ['oсеnka72@mail.ru'],
            phones: ['73452533193'],
            contact_persons: ['Скрипник Надежда Анатольевна'],
            company_name: 'Скрипник Надежда Анатольевна',
            average_capitalization: '21300',
            reputation: 'Хорошая',
          },
          {
            emails: ['invest-audit@perm.ru'],
            phones: ['79028352371'],
            contact_persons: ['Чурин Егор Александрович'],
            company_name: 'Чурин Егор Александрович',
            average_capitalization: '30000',
            reputation: 'Хорошая',
          },
          {
            emails: ['profcentr@bk.ru'],
            phones: ['79024768101'],
            contact_persons: ['Философенко Татьяна Наильевна'],
            company_name: 'Философенко Татьяна Наильевна',
            average_capitalization: '36000',
            reputation: 'Хорошая',
          },
          {
            emails: ['rinaturr@mail.ru'],
            phones: ['790-484-33625'],
            contact_persons: ['Уразаев Ринат Данисович'],
            company_name: 'Уразаев Ринат Данисович',
            average_capitalization: '499000',
            reputation: 'Хорошая',
          },
        ],
      } as ResultResponse;

      let normalizedRes: ResultEntity[] = [];
      normalizedRes = normalizedRes.concat(...Object.values(res));
      dispatch({ type: EActionTypes.LOAD_RESULTS_SUCCESS, payload: normalizedRes });
    }, 5000);
  } catch (err) {
    console.error(err);
    dispatch({ type: EActionTypes.LOAD_RESULTS_FAILURE, payload: err });
  }
};
