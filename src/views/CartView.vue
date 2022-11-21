<template>
  <div class="wrap">
    <h2>Оплата курсу <br> {{ course.title.rendered }}</h2>
    <div class="item_block">
      <img :src="course.ACF.bot_image" class="course_img"/>
      <div class="info">
        <div class="line">
          <div class="text">Тривалість</div>
          <div class="value"> {{ course.ACF.bot_course_duration }} місяці</div>
        </div>
        <div class="line">
          <div class="text">Вартість за&nbsp;місяць</div>
          <div class="value"> {{ month }} грн</div>

        </div>
        <div class="line">
          <div class="text">Повна вартість</div>
          <div class="sale">-10%</div>
          <div class="value">
            <span class="old">{{ fullSum }} грн</span>
            <br>
            <span>{{ salePrice }} грн</span>
          </div>
        </div>
      </div>
    </div>
    <button type="button" @click="monthPay" :class="{active: btn1 === true}">За місяць</button>
    <button type="button" @click="fullPay" :class="{active: btn2 === true}">Повна вартість</button>
    <div v-if="btn1 || btn2">
      <div class="line_bottom"></div>
      <div class="coupon">
        <input type="text" placeholder="Промокод" v-model="code">
        <span class="hint" v-if="hint">Вітаємо! Промокод введено вірно!<br>
Ваша знижка складає 25%</span>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";
import {useTelegram} from "@/helpers/useTelegram"

export default {
  name: 'CartView',
  data: () => ({
    order: {
      course_name: '',
      sum_to_pay: '',
      promo_code: '',
      user_name: '',
      user_phone: '',
    },
    btn1: false,
    btn2: false,
    hint: false,
    code: '',
  }),
  computed: {
    ...mapState('courses', ['course']),
    month() {
      return this.course.ACF.bot_course_price * 1;
    },
    fullSum() {
      return (this.course.ACF.bot_course_price * this.course.ACF.bot_course_duration);
    },
    salePrice() {
      return this.fullSum * 0.9;
    }
  },
  methods: {
    monthPay() {
      this.btn1 = true;
      this.btn2 = false;

      this.order.course_name = this.course.title.rendered;
      this.order.sum_to_pay = this.month;


      this.sendData(this.order);
    },
    fullPay() {
      this.btn1 = false;
      this.btn2 = true;

      this.order.course_name = this.course.title.rendered;
      this.order.sum_to_pay = this.salePrice;

      this.sendData(this.order);
    },
    sendData(course) {
      const {tg} = useTelegram();

      if (course.promo_code === 'black friday') {
        course.sum_to_pay = course.sum_to_pay * 0.75;
        this.hint = true;
      }

      tg.MainButton.setParams({
        text: 'Сплатити ' + course.sum_to_pay + ' грн.',
        color: '#217C2F',
      });

      if (!course.courseName && !course.sum_to_pay){
        tg.MainButton.hide();
      } else {
        tg.MainButton.show();
      }

      const orderData = JSON.stringify(course);

      tg.onEvent('mainButtonClicked', function(){
         tg.sendData(orderData);
         console.log(orderData);
        fetch('http://localhost:8000', {
          method: 'POST',
          headers: {
            'Content_Type': 'application/json'
          },
          body: JSON.stringify(course)
        })

      });
      tg.offEvent('mainButtonClicked', () => {
         tg.sendData(orderData);
         console.log(orderData);
      });

      /* промокод */


    },
  },
  watch: {
    // при каждом изменении `question` эта функция будет запускаться
    code() {
      this.order.promo_code = this.code;
    }
  },
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
}

.item_block {
  margin-top: 40px;
  padding-bottom: 10px;
  display: flex;
}

.item_block img {
  width: 110px;
  height: 110px;
}

.item_block .info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 7px;
  flex: 1 1;
}

.item_block .info .line {
  display: flex;
  justify-content: space-between;
  padding-left: 6px;
  align-items: flex-end;
}

.item_block .info .line .text {
  width: 75px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
}

.item_block .info .line .value {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  max-width: 90px;
  text-align: right;
}

.item_block .info .line .sale {
  height: 37px;
  width: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E00A23;
  color: #FFFFFF;
  border-radius: 50%;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  transform: rotate(22deg);
}

.item_block .info .line .value .old {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #878787;
  background-image: linear-gradient(to bottom right, transparent 46%, #E00A23, transparent 53%);
}

.item_block .info .line:last-of-type {
  background: #D9D9D933;
  backdrop-filter: blur(2px);
  padding: 5px 7px 5px 6px;
  align-items: center;
  width: calc(100% + 9px);
  box-sizing: border-box;
}

button {
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  color: #181818;
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
  border: 1px solid #181818;
  padding: 15px 0;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.3s ease-in;
}

button:hover,
button.active {
  color: #FFFFFF;
  background-color: #E00A23;
  border: 1px solid #E00A23;
  transition: 0.3s ease-in;
}

.line_bottom {
  background: #D9D9D9;
  opacity: 0.7;
  height: 1px;
  width: calc(100% + 30px);
  margin: 15px 0 15px -15px;
  text-align: center;
}

.coupon input {
  width: calc(100% - 24px);
  padding: 15px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
}

.coupon input {
  outline: 0;
}

.hint {
  margin-top: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
}
</style>