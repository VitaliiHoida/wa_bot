<template>
  <a :href="course.link" target="_blank" class="course_link">
    <div class="course_item">
      <img src="" class="course_img"/>
      <h2 class="course_title">{{ course.title.rendered.toUpperCase() }}</h2>
    </div>
  </a>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true
    },
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

.course_link:hover,
.course_link:active
{
  color: #fff;
  background-color: #e33825;
}

.course_item {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0;
}

.course_img {
  height: 100px;
  width: 100px;
  margin-right: 5px;
}

.course_title {
  font-size: 14px;
  line-height: 19px;
  font-weight: 500;
}
</style>