<template>
  <div class="wrap">
<!--    <picture class="cafe-item-lottie js-item-lottie" v-if="item.ACF.bot_image.includes('.tgs')">
      <source type="application/x-tgsticker" :srcset="item.ACF.bot_image">

      <canvas width="74" height="74"></canvas>
    </picture>-->
    <img :src="item.ACF.bot_image" class="course_img" />
    <span>{{ item.title.rendered }}</span>
    <button type="button" @click="choose(item)">ОБРАТИ</button>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: 'CourseCard',
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  emits: {
    payMonth: null,
    payFull: null,
  },
  data: () => ({
    payClick: false,
  }),
  methods: {
    ...mapMutations('courses', ['chooseCourse']),
    choose(el) {
     this.chooseCourse(el);
     this.$router.push({name: 'cart', query: {id: el.id}});
    }
  },
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  width: 100px;
  margin: 0 0 30px 0;
  justify-content: space-between;
  text-align: center;
}

img {
  margin-bottom: 5px;
  height: 100px;
  width: 100%;
}

span {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 10px;
}

button {
  width: 100%;
  text-align: center;
  padding: 10px 0;
  border-radius: unset;
  border: none;
  color: #FFFFFF;
  background-color: #E00A23;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  cursor: pointer;
}
</style>