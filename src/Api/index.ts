import axios, { AxiosResponse } from 'axios';

const sendData = (res: AxiosResponse): any => res.data;

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
};

export default api;
