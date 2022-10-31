import axios from '@/api/axios';

const getCourses = (apiUrl) => {
  return axios.get(apiUrl);
};

export default {
  getCourses,
};
