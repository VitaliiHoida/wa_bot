import coursesApi from '@/api/courses';

export default {
  name: 'courses',
  namespaced: true,
  state: {
    data: null,
  },
  getters: {},
  mutations: {
    getCoursesStart(state) {
      state.data = null;
    },
    getCoursesSuccess(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    getCourses(context, { apiUrl }) {
      return new Promise((resolve) => {
        context.commit('getCoursesStart');
        coursesApi
          .getCourses(apiUrl)
          .then((response) => {
            context.commit('getCoursesSuccess', response.data);
            resolve(response.data);
          })
          .catch(() => {});
      });
    },
  },
};
