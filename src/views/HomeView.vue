<template>
  <div>
    <h2>Оберіть курс для оплати</h2>
    <div class="body">
      <course-card v-for="(course, index) in courses"
                   :key="index"
                   :item="course"
      />

    </div>
    <hr>
    <div class="contacts">
      <div class="phones">
        <ul>
          <li>м.Кривий Ріг</li>
          <li><a href="tel:+380984775490">+380984775490</a></li>
          <li><a href="mailto:info@webnauts.academy">info@webnauts.academy</a></li>
        </ul>
      </div>
      <a href="Ofert.pdf" download>Публічна оферта</a>
    </div>
  </div>
</template>

<script>
import CourseCard from "@/components/CourseCard";
import {mapState} from "vuex";

export default {
  name: 'HomeView',
  components: {
    CourseCard,
  },
  computed: {
    ...mapState('courses', ['data']),
    courses() {
      let actives = [];
      this.data?.forEach(el => {
        if (el.ACF.bot_active_course) {
          actives.push(el);
        }
      });
      return actives;
    }
  },
}
</script>

<style>
.body {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: stretch;
  margin-top: 40px;
}

h2 {
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  text-transform: uppercase;
}

.contacts {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 400;
}

.contacts a{
  text-decoration: none;
  color: var(--tg-theme-text-color);
}

.phones ul{
  list-style: none;
  margin:0;
  padding: 0;
}

.phones ul li:not(:last-of-type){
  padding-bottom: 5px;
}
</style>
