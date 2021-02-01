import axios from 'axios';
import store from '@/store';
import humps from 'lodash-humps';

const API_HOST = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';

const api = axios.create({
  baseURL: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/',
});

// api.interceptors.request.use(capitalizeCamelCaseJSON);
api.interceptors.request.use((request) => {
  request.headers['X-RapidAPI-Key'] = store.state.user.accessToken;
  request.headers['X-RapidAPI-Host'] = API_HOST;
  return request;
});

const camelCaseJSON = (config) => {
  config.data = humps(config.data); // eslint-disable-line no-param-reassign
  return config;
};

api.interceptors.response.use(camelCaseJSON);

export default {
  get: async (url, config) => {
    let result = null;
    try {
      result = await api.get(url, config);
    } catch (error) {
      console.log(error);
    }
    return result.data;
  },
};
