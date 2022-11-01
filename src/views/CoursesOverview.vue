<template>
  <div class="home wrapper">
    <div class="container">
      <h1 class="title">Повний перелік наших курсів</h1>
      <div class="course_wrapper" >
        <course-card v-for="(item, index) in data" :key="index" :course="item"></course-card>
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
.course_wrapper {
  margin: 5px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}


</style>