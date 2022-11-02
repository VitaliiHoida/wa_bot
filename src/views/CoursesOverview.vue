<template>
  <div class="home wrapper">
    <div class="container">
      <router-link class="back_link" :to="{name: 'home'}">&#8592; Назад</router-link>
      <h1 class="title">Повний перелік наших курсів</h1>
      <div class="course_wrapper" >
        <course-card v-for="(item, index) in data" :key="index" :course="item" overview></course-card>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import CourseCard from "@/components/CourseCard";

export default {
  name: 'CoursesOverview',
  components: {
    CourseCard,
  },
  computed: {
    ...mapState('courses', ['data']),
  },
}
</script>

<style>
</style>