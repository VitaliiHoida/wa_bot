<template>
  <div v-if="actual">
    <div class="course_link" v-if="course.ACF.bot_active_course">
      <div class="course_item">
        <img :src="course.ACF.bot_image" class="course_img"/>
        <div class="course_info">
          <h2 class="course_title">{{ course.title.rendered.toUpperCase() }}</h2>
          <a :href="course.link" target="_blank" v-if="overview">Натисність, щоб дізнатись більше...</a>
          <div class="buttons" v-if="actual">
            <button>Сплатити 1 місяць</button>
            <button>Сплатити повний курс</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="coming">
    <div class="course_link" v-if="!!course.ACF.bot_course_start">
      <div class="course_item">
        <img :src="course.ACF.bot_image" class="course_img"/>
        <div class="course_info">
          <h2 class="course_title">{{ course.title.rendered.toUpperCase() }}</h2>
          <a :href="course.link" target="_blank" v-if="overview">Натисність, щоб дізнатись більше...</a>
          <div class="buttons" v-if="!pay">
            <button>Записатись</button>
            <button @click="change()">Сплатити</button>
          </div>
          <div class="buttons" v-else>
            <button>Сплатити 1 місяць</button>
            <button>Сплатити повний курс</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="overview">
    <div class="course_link">
      <div class="course_item">
        <img :src="course.ACF.bot_image" class="course_img"/>
        <div class="course_info">
          <h2 class="course_title">{{ course.title.rendered.toUpperCase() }}</h2>
          <a :href="course.link" target="_blank" >Натисність, щоб дізнатись більше...</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true
    },
    overview: {
      type: Boolean,
    },
    actual: {
      type: Boolean,
    },
    coming: {
      type: Boolean,
    }
  },
  data: () => ({
    pay: false,
  }),
  methods: {
    change() {
      this.pay = !this.pay;
    }
  },
}
</script>

<style scoped>
.course_link {
  border: 1px solid #000;
  color: #000;
  text-decoration: none;
  margin: 5px 0;
}


.course_item {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0;
}

.course_info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 5px 5px 5px;
  width: 100%;
}

.course_img {
  height: 100px;
  width: 100px;
  border-right: 1px solid #787878;
}

.course_title {
  font-size: 14px;
  line-height: 19px;
  font-weight: 500;
  margin: 10px 0 0 0;
}

.course_item a {
  font-size: 12px;
  color: #787878;
  margin: 10px 0 5px 0;
  text-decoration: none;
}

.course_item a:hover {
  color: #e33825;
}

.course_item button {
  border: 1px solid #000;
  color: #000;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 300;
  background-color: #fff;
  cursor: pointer;
  min-width: 170px;
  padding: 2px 0;
  text-align: center;
  margin: 2px 0;
}

.course_item button:hover {
  background-color: #e33825;
  color: #fff;
}
</style>