<template>
  <div class="wrap">
    <h2>
      Оплата курсу <br />
      {{ course.title.rendered }}
    </h2>
    <div class="item_block">
      <img :src="course.ACF.bot_image" class="course_img" />
      <div class="info">
        <div class="line">
          <div class="text">Тривалість</div>
          <div class="value">{{ course.ACF.bot_course_duration }} місяці</div>
        </div>
        <div class="line">
          <div class="text">Вартість за&nbsp;місяць</div>
          <div class="value">{{ month }} грн</div>
        </div>
        <div class="line">
          <div class="text">Повна вартість</div>
          <div class="sale">-10%</div>
          <div class="value">
            <span class="old">{{ fullSum }} грн</span>
            <br />
            <span>{{ salePrice }} грн</span>
          </div>
        </div>
      </div>
    </div>
    <button type="button" @click="monthPay" :class="{ active: btn1 }">
      За місяць
    </button>
    <button type="button" @click="fullPay" :class="{ active: btn2 }">
      Повна вартість
    </button>
    <div v-if="btn1 || btn2">
      <div class="line_bottom"></div>
      <div class="coupon">
        <input type="text" placeholder="Промокод" v-model="code" />
        <span class="hint" v-if="hint">
          Вітаємо! Промокод введено вірно!<br />
          Ваша знижка складає 25%
        </span>
      </div>
    </div>
    {{ pay_link }}
    <button type="button" @click="goToSite">Подбробиці на сайті →</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { useTelegram } from "@/helpers/useTelegram";
import axios from "@/api/axios";

export default {
  name: "CartView",
  data: () => ({
    order: {
      course_name: "",
      sum_to_pay: "",
      promo_code: "",
      user_name: "",
      user_phone: "",
    },
    btn1: false,
    btn2: false,
    code: "",
    sum: "",
  }),
  computed: {
    ...mapState("courses", { selectedCource: "course", courses: "data" }),
    course() {
      return (
        this.selectedCource ??
        this.courses.find((obj) => obj.id === Number(this.$route.query.id))
      );
    },
    month() {
      return this.course.ACF.bot_course_price * 1;
    },
    fullSum() {
      return (
        this.course.ACF.bot_course_price * this.course.ACF.bot_course_duration
      );
    },
    salePrice() {
      return this.fullSum * 0.9;
    },
    hint() {
      return this.code === "black friday";
    },
  },
  methods: {
    monthPay() {
      this.btn1 = true;
      this.btn2 = false;
      this.order.course_name = this.course.title.rendered;
      this.sum = this.month;
      this.order.sum_to_pay = this.sum;
      this.order.descr = "1 місяць";
      this.sendData(this.order);
    },
    fullPay() {
      this.btn1 = false;
      this.btn2 = true;
      this.order.course_name = this.course.title.rendered;
      this.sum = this.salePrice;
      this.order.sum_to_pay = this.sum;
      this.order.descr = "повний курс";
      this.sendData(this.order);
    },
    sendData(order) {
      const { tg, queryId, user, chatId } = useTelegram();
      order.user_name = user.first_name + " " + user.last_name;
      order.photo = this.course.ACF.bot_image;

      tg.MainButton.setParams({
        text: "Сплатити " + order.sum_to_pay + " грн.",
        color: "#217C2F",
      });

      tg.MainButton.show();

      const mainButtonHandler = function () {
        const data = {
          order,
          queryId,
          chatId,
        };

        axios
          .post("https://wabot.webnauts.academy/web-data", data, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            tg.openInvoice(response.data, function (status) {
              if (status == "paid") {
                tg.close();
              } else if (status == "failed") {
                tg.HapticFeedback.notificationOccurred("error");
                //Cafe.showStatus('Payment has been failed.');
              } else {
                tg.HapticFeedback.notificationOccurred("warning");
              }
            });
          });

        tg.MainButton.hide();

        tg.offEvent("mainButtonClicked", mainButtonHandler);
      };

      tg.onEvent("mainButtonClicked", mainButtonHandler);
    },
    goToSite() {
      window.open(this.course.link, "_blank");
    },
  },
  watch: {
    hint() {
      if (this.hint) {
        if (!this.btn2) {
          this.order.sum_to_pay = this.sum * 0.75;
        } else {
          this.order.sum_to_pay = this.fullSum * 0.75;
        }
        this.order.promo_code = this.code;
        this.sendData(this.order);
      } else {
        this.order.sum_to_pay = this.sum;
        this.sendData(this.order);
      }
    },
  },
};
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
  background-color: #e00a23;
  color: #ffffff;
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
  background-image: linear-gradient(
    to bottom right,
    transparent 46%,
    #e00a23,
    transparent 53%
  );
}

.item_block .info .line:last-of-type {
  background: #d9d9d933;
  backdrop-filter: blur(2px);
  padding: 5px 7px 5px 6px;
  align-items: center;
  width: calc(100% + 9px);
  box-sizing: border-box;
}

.site_link {
  margin-top: 15px;
}

button,
.site_link {
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
  text-align: center;
}

button:hover,
button.active,
.site_link:active {
  color: #ffffff;
  background-color: #e00a23;
  border: 1px solid #e00a23;
  transition: 0.3s ease-in;
}

.line_bottom {
  background: #d9d9d9;
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
