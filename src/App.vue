<template>
  <div class="wrapper">
    <div class="container">
      <div class="fw">
        <div class="header">
          <div class="back_container">
            <router-link :to="{name: 'home'}" title="На головну"><img src="@/assets/img/back.svg" alt="back" v-if="$route.path !== '/'"/></router-link>
          </div>
          <div class="img_container">
            <img src="@/assets/img/logo.svg" alt="Webnauts Academy"/>
          </div>
          <div class="support_container">
            <a href="https://t.me/t_khimich" title="Написати адміністратору"><img src="@/assets/img/support.svg" alt="support"/></a>
          </div>
        </div>
      </div>
      <router-view/>
    </div>
  </div>

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

* {
  font-family: "Roboto";
}

body {
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
  padding: 30px 15px 10px 15px;
  width: calc(100% - 30px);
  max-width: 370px;
  min-height: 100vh;
}

.fw {
  width: calc(100% + 30px);
  margin-left: -15px;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.header {
  display: flex;
  width: calc(100% - 30px);
  justify-content: space-between;
  padding: 15px 0;
}

.header .back_container {
  width: 40px;
}
</style>
