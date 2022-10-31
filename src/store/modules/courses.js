import coursesApi from '@/api/courses';

export default {
  name: 'courses',
  namespaced: true,
  state: {
    data: null,
    isLoading: false,
    error: null,
  },
  getters: {},
  mutations: {
    getCoursesStart(state) {
      state.isLoading = true;
      state.data = null;
    },
    getCoursesSuccess(state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    getCoursesFailure(state) {
      state.isLoading = false;
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
          .catch(() => {
            context.commit('getCoursesFailure');
          });
      });
    },
  },
};
