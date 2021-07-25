<template>
  <div class="wrapper ps-4 pe-4">
    <div class="d-flex justify-content-between mt-3">
      <h3 class="fw-bold">Список заказов:</h3>
      <div>
        <DeleteOrder v-if="selectedOrders.length" :orders="selectedOrders" @deleted-orders="loadListOrders"/>
        <AddOrder @added-order="loadListOrders"/>
      </div>
    </div>
    <div class="main-block-wrapper">
      <div class="main-block mt-3 p-3 ps-5 pe-5">
        <div class="row order p-0 m-0 mt-3 pb-4">
          <div class="col-1 fw-bold">ID</div>
          <div class="col-3 text-center fw-bold">Дата</div>
          <div class="col-3 text-center fw-bold">Заказчик</div>
          <div class="col-3 text-end fw-bold">Сумма заказа</div>
          <div class="col-2 text-center">
            <button class="fw-bold btn shadow-none select-button p-0 ps-3 pe-3 d-inline"
                    @click="selectDeselectAll">Выбрать
            </button>
          </div>
        </div>
        <template v-if="orders.length">
          <div v-for="order in orders" :key="order" class="row order p-0 m-0 pt-3 pb-2"
               :class="{'selected-block': selectedOrders.includes(order.id)}">
            <div class="col-1">{{ order.id }}</div>
            <div class="col-3 text-center">{{ order.created_at.split('T')[0] }}</div>
            <div class="col-3 text-center">{{ order.customer }}</div>
            <div class="col-3 text-end">{{ order.price }}</div>
            <div class="col-2 text-center">
              <i class="fs-6 me-1" @click="selectDeselectOrder(order.id)" :class="
              {'text-danger fas fa-check-circle': selectedOrders.includes(order.id),
              'far fa-circle': !selectedOrders.includes(order.id)}">
              </i>
            </div>
          </div>
        </template>
        <div v-else class="text-center pt-5">
          <span v-if="loading" class="spinner-border spinner-border fs-5"></span>
          <p v-else class="fs-5">Ещё не было ни одного заказа</p>
        </div>
      </div>
    </div>
    <div v-if="orders.length" class="d-flex justify-content-center mt-3">
      <Paginator :total="totalPages"/>
    </div>
  </div>
</template>

<script>
import {OrderUserService} from "../services/auth-required.services";
import Paginator from "../components/Paginator";
import AddOrder from "../components/AddOrder";
import DeleteOrder from "../components/DeleteOrder";

export default {
  name: "Orders",
  title: "Все заказы",
  components: {DeleteOrder, AddOrder, Paginator},
  data() {
    return {
      loading: false,
      totalPages: '',
      selectedOrders: []
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    pageStateOptions() {
      return {
        page: this.page
      };
    },
    queryParams() {
      return {
        page: this.$route.query.page
      };
    },
    page() {
      return this.$store.state.page;
    },
    orders() {
      return this.$store.state.orders;
    },
  },
  created() {
    this.initUrlParams(this.page);
    this.loadListOrders();
  },
  methods: {
    makeParams() {
      return {
        page: this.page
      };
    },
    initUrlParams(page) {
      if (page && this.$route.query.page) {
        this.$store.commit('changePage', parseInt(this.$route.query.page));
      }
    },
    loadListOrders() {
      this.selectedOrders = [];
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
    selectDeselectOrder(id) {
      if (this.selectedOrders.includes(id)) {
        this.selectedOrders.splice(this.selectedOrders.indexOf(id), 1);
      } else {
        this.selectedOrders.push(id);
      }
    },
    selectDeselectAll() {
      if (this.selectedOrders.length) {
        this.selectedOrders = [];
      } else {
        for (const index in this.orders) {
          this.selectedOrders.push(this.orders[index].id);
        }
      }
    }
  },
  watch: {
    pageStateOptions(value) {
      if (value.page === 1) {
        this.$router.push(`${window.location.pathname}`);
      } else {
        this.$router.push(`${window.location.pathname}?page=${value.page}`);
      }
    },
    page() {
      this.loadListOrders()
    },
    $route() {
      if (this.$route.name !== this.$options.name) {
        this.$store.commit('changePage', 1);
      }
    },
    queryParams(to) {
      if (this.$route.name !== this.$options.name) {
        return
      }
      this.$store.commit('changePage', to.page ? parseInt(to.page) : 1)
    }
  }
}
</script>

<style scoped>

</style>