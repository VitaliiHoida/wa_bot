<template>
  <div class="home wrapper">
    <div class="container">
      <div class="img_container">
        <img src="@/assets/logo.svg" alt="Webnauts Academy" />
      </div>
      <nav class="main_menu">
        <router-link class="main_menu-item" :to="{name: 'actual'}">Курси, що йдуть</router-link>
        <router-link class="main_menu-item" :to="{name: 'coming'}">Скоро розпочнуться</router-link>
        <router-link class="main_menu-item" :to="{name: 'overview'}">Огляд всіх курсів</router-link>
        {{ theme }}
      </nav>
    </div>
  </div>
</template>

<script>
import {useTelegram} from "@/helpers/useTelegram";
export default {
  name: 'HomeView',
  computed: {
    theme() {
      const {tg} = useTelegram();
      return tg.accaun.getTheme();
    }
  },
}
</script>

<style>
.main_menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.main_menu-item {
  margin: 15px 0;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  padding: 10px 20px;
  color: var(--tg-theme-button-text-color);
  background-color: var(--tg-theme-button-color);
  min-width: 240px;
  text-align: center;
  letter-spacing: 1px;
  border: none;
  outline: none;
}



.img_container {
  text-align: center;
  margin-bottom: 25px;

}

.img_container img {
  width: 100%;
}
</style>
