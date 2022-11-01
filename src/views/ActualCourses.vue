<template>
  <div class="wrapper">
    <div class="container">
      <h1 class="title">Поточні курси</h1>
      <div class="course_wrapper" >
        <course-card v-for="(item, index) in data" :key="index" :course="item" actual></course-card>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import CourseCard from "@/components/CourseCard";

export default {
  name: 'CoursesOverview',
  components: {
    CourseCard,
  },
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
}
</script>

<style scoped>

</style>