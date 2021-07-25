<template>
  <div class="wrapper ps-4 pe-4">
    <div class="d-flex justify-content-between mt-3">
      <h3 class="fw-bold"
          v-if="weekNumber">Заказы за неделю {{ weekNumber.split('W')[1] }}, год
        {{ weekNumber.split('W')[0].replaceAll('-', '') }}:
      </h3>
      <h3 class="fw-bold" v-else>Заказы за последнюю неделю:</h3>
      <input type="week" v-model="weekNumber">
    </div>
    <div class="main-block-wrapper">
      <div class="main-block mt-3 p-3">
        <div class="row order p-0 m-0 mt-3 pb-4">
          <div class="col-3 fw-bold">Дата</div>
          <div class="col-6 text-center fw-bold">Заказчики за день</div>
          <div class="col-3 text-end fw-bold">Сумма заказов</div>
        </div>
        <template v-if="ordersByWeek.length">
          <div v-for="order in ordersByWeek" :key="order" class="row order p-0 m-0 mt-3 pb-2">
            <div class="col-3 d-flex align-items-center">{{ order.day }}</div>
            <div class="col-6 d-flex align-items-center">{{ order.customers }}</div>
            <div class="col-3 d-flex align-items-center justify-content-end">{{ order.total }}</div>
          </div>
        </template>
        <div v-else class="text-center pt-5">
          <span v-if="loading" class="spinner-border spinner-border fs-5"></span>
          <p v-else class="fs-5">За выбранную неделю заказов нет</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {OrderService} from "../services/auth-unrequired.services";

export default {
  name: "Home",
  title: 'Заказы за неделю',
  props: [
    'message'
  ],
  data() {
    return {
      ordersByWeek: [],
      weekNumber: undefined,
      loading: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.loadListOrdersByWeek();
  },
  methods: {
    loadListOrdersByWeek() {
      this.ordersByWeek = []
      this.loading = true;
      OrderService.getListOrdersByWeek(this.weekNumber).then(
          response => {
            // this.ordersByWeek = response.data;
            setTimeout(() => { this.ordersByWeek = response.data; this.loading = false; }, 300);
          },
          error => {
            this.loading = false;
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      );
    },
  },
  watch: {
    weekNumber() {
      this.loadListOrdersByWeek();
    }
  }
}
</script>

<style scoped>
.main-block {
  min-height: 70vh !important;
}
</style>