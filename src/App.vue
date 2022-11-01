<template>
  <router-view />
</template>

<style>
@import url("@/assets/fonts/Akzidenz-GroteskPro/stylesheet.css");

body {
  font-family: "Akzidenz-Grotesk Pro";
  background-color: #fff;
  margin: 0;
}

.wrapper {
  margin: 0 auto;
  max-width: 380px;
  width: 100%;
}
.container {
  padding: 10px 5px 10px 5px;
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
</style>
