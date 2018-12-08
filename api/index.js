import realApi from './server';
import mockApi from './mock';

const api = process.env.NODE_ENV === 'production' ? realApi : mockApi;

export default api;
