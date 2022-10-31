<template>
  <div class="home wrapper">
    <div class="container">
      <div class="course_wrapper" v-for="(course, index) in data" :key="index">
        {{ course.title.rendered.toLowerCase() }}
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapState('courses', ['isLoading', 'data', 'error']),
  },
  methods: {
    ...mapActions('courses', ['getCourses']),
    fetchCourses() {
      const url = 'courses/?lang=uk&per_page=100';
      this.getCourses({apiUrl: url});
    },
  },
  mounted() {
    this.fetchCourses();
  },
};
</script>

<style>
.course_wrapper {
  margin: 5px 0;
}
</style>
