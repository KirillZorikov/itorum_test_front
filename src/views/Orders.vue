<template>
  <div class="wrapper ps-4 pe-4">
    <div class="d-flex justify-content-between mt-3">
      <h3 class="fw-bold">Список заказов:</h3>
      <button type="button" class="btn add-button">
        <svg
            class="-ml-0.5 mr-2 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#ffffff"
        >
          <path
              d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          ></path>
        </svg>
        Добавить
      </button>
    </div>
    <div class="main-block-wrapper">
      <div class="main-block mt-3 p-3 ps-5 pe-5">
        <div class="row order p-0 m-0 mt-3 pb-4">
          <div class="col-2 fw-bold">ID</div>
          <div class="col-3 text-center fw-bold">Дата</div>
          <div class="col-4 text-center fw-bold">Заказчик</div>
          <div class="col-3 text-end fw-bold">Сумма заказа</div>
        </div>
        <template v-if="orders.length">
          <div v-for="order in orders" :key="order" class="row order p-0 m-0 mt-3 pb-2">
            <div class="col-2">{{ order.id }}</div>
            <div class="col-3 text-center">{{ order.created_at.split('T')[0] }}</div>
            <div class="col-4 text-center">{{ order.customer }}</div>
            <div class="col-3 text-end">{{ order.price }}</div>
          </div>
        </template>
        <div v-else class="text-center pt-5">
          <span v-if="loading" class="spinner-border spinner-border fs-5"></span>
          <p v-else class="fs-5">Ещё не было ни одного заказа</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {OrderUserService} from "../services/auth-required.services";

export default {
  name: "Orders",
  data() {
    return {
      loading: false,
      totalPages: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    page() {
      return this.$store.state.page;
    },
    orders() {
      return this.$store.state.orders;
    },
  },
  created() {
    this.loadListOrders();
  },
  methods: {
    makeParams() {
      return {
        page: this.page
      };
    },
    loadListOrders() {
      this.loading = true;
      OrderUserService.getListOrders(this.makeParams()).then(
          response => {
            this.loading = false;
            this.$store.commit('changeOrders', response.data.response);
            this.totalPages = response.data['pages_count'];
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
}
</script>

<style scoped>

</style>