<template>
  <router-view />
</template>

<script>
import {mapActions} from "vuex";

export default {
  methods: {
    ...mapActions('courses', ['getCourses']),
    fetchCourses() {
      const url = 'courses/?lang=uk&per_page=100';
      this.getCourses({apiUrl: url});
    },
  },
  created() {
    this.fetchCourses();
  },
}
</script>

<style>
@import url("@/assets/fonts/Akzidenz-GroteskPro/stylesheet.css");

body {
  font-family: "Akzidenz-Grotesk Pro";
  background-color: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  margin: 0;
}

.wrapper {
  margin: 0 auto;
  max-width: 380px;
  width: 100%;
}
.container {
  padding: 20px 5px 10px 5px;
  width: calc(100% - 10px);
  max-width: 370px;
  min-height: 100vh;
}
.title {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: 5px;
  letter-spacing: 1px;
}
.course_wrapper {
  margin: 5px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.back_link {
  font-size: 12px;
  text-transform: uppercase;
  text-decoration: none;
  color: #787878;
  padding: 5px;
  letter-spacing: 1px;
  font-weight: 500;
}
.back_link:active,
.back_link:hover {
  color: #e33825;
}
</style>
