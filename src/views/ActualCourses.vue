<template>
  <div class="wrapper">
    <div class="container">
      <router-link class="back_link" :to="{name: 'home'}">&#8592; Назад</router-link>
      <h1 class="title">Поточні курси</h1>
      <div class="course_wrapper">
        <course-card v-for="(item, index) in data"
                     :key="index"
                     :course="item"
                     actual
                     @payFull="buyFull(item)"
                     @payMonth="buyMonth(item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import CourseCard from "@/components/CourseCard";
import {useTelegram} from "@/helpers/useTelegram";

export default {
  name: 'CoursesOverview',
  components: {
    CourseCard,
  },
  data: () => ({
    order: {
      courseName: '',
      sumToPay: '',
      comment: '',
    },
  }),
  computed: {
    ...mapState('courses', ['data']),
  },
  methods: {
    buyMonth(item) {
      this.order.courseName = item.title.rendered;
      this.order.sumToPay = parseInt(item.ACF.bot_course_price, 10);
      this.sendData(this.order);
    },
    buyFull(item) {
      this.order.courseName = item.title.rendered;
      this.order.sumToPay = parseInt(item.ACF.bot_course_price, 10) * parseInt(item.ACF.bot_course_duration, 10);
      this.sendData(this.order);
    },
    sendData(course) {
      const {tg} = useTelegram();

      tg.MainButton.setParams({
        text: 'Сплатити ' + course.sumToPay + ' грн.',
      });

      if (!course.courseName && !course.sumToPay){
        tg.MainButton.hide();
      } else {
        tg.MainButton.show();
      }

      // const orderData = JSON.stringify(course);

      tg.onEvent('mainButtonClicked', function(){
        // tg.sendData(orderData);
        // console.log(orderData);
        fetch('http://localhost:8000', {
          method: 'POST',
          headers: {
            'Content_Type': 'application/json'
          },
          body: JSON.stringify(course)
        })

      });
      tg.offEvent('mainButtonClicked', () => {
        // tg.sendData(orderData);
        // console.log(orderData);
      })
    }
  },
}
</script>

<style scoped>

</style>