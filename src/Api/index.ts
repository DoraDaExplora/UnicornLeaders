import axios, { AxiosResponse } from 'axios';

const sendData = (res: AxiosResponse): any => res.data;

axios.defaults.baseURL = 'https://unicorn-dev.codes/';

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      return Promise.reject(sendData(error.response));
    }
    return Promise.reject(error);
  },
);

const api = {
  search: (data: any) => axios.post('/search', data).then(sendData),
  getTaskStatus: (ids: number[]) => axios.post('/status/tasks', { ids: ids }).then(sendData),
  getTaskResults: (ids: number[]) => axios.post('/data/collect', { ids: ids }).then(sendData),
  sendMail: (data: any) => axios.post('/mail/from_template', data).then(sendData),
};

export default api;
