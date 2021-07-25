<template>
  <button type="button" class="btn add-button" data-bs-toggle="modal" data-bs-target="#modalAddOrder">
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

  <!-- Modal -->
  <div class="modal fade" id="modalAddOrder" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <form @submit.prevent="addOrder">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Добавление заказа</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <FormMessage v-if="showMessage" :message="message" @hide-message="hideMessage"/>

            <div class="mb-3 row pe-5 ps-5 d-flex align-items-center justify-content-between">
              <label class="col-5 col-form-label p-0 fs-6">Заказчик</label>
              <div class="col-7 ps-3 pe-0 pt-2 pb-2">
                <vue-select class="fs-3"
                            v-model="form.customer"
                            :options="options.customers"
                            searchable
                            close-on-select
                            placeholder="Выберите заказчика:"
                            :search-placeholder="form.customer ? form.customer: 'Поиск'"
                />
              </div>
            </div>

            <div class="mb-2 row pe-5 ps-5 d-flex align-items-center justify-content-between">
              <label for="inputPrice" class="col-5 col-form-label p-0 fs-6">Стоимость</label>
              <div class="col-7 ps-3 pe-0 mt-2">
                <input
                    required
                    v-model="form.price"
                    type="number"
                    min="1"
                    class="form-control p-2"
                    name="time"
                    id="inputPrice"
                    oninput="validity.valid||(value='');"
                >
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
            <button type="submit" class="btn btn-primary">
              <span v-show="loading" class="spinner-border spinner-border-sm me-1"></span>
              <span>Добавить</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- Modal -->

</template>

<script>
import {CustomerUserService} from "../services/auth-required.services";
import {OrderUserService} from "../services/auth-required.services";
import VueNextSelect from 'vue-next-select';
import FormMessage from "./FormMessage";
import { Modal } from 'bootstrap';

export default {
  name: "AddOrder",
  components: {
    FormMessage,
    'vue-select': VueNextSelect,
  },
  emits:['added-order'],
  data() {
    return {
      loading: false,
      form: {
        customer: '',
        price: ''
      },
      options: {
        customers: []
      },
      message: '',
      showMessage: false
    }
  },
  created() {
    this.loadListCustomers();
  },
  methods: {
    loadListCustomers() {
      CustomerUserService.getListCustomers().then(
          response => {
            this.options.customers = response.data.map(x => {
              return x.user
            });
          }
      )
    },
    preparedFormData() {
      let data = new FormData();
      data.append('customer', this.form.customer);
      data.append('price', this.form.price);
      return data;
    },
    cleanForm() {
      this.form.price = '';
      this.form.customer = '';
    },
    addOrder() {
      if (!this.simpleValidate()) {
        return
      }
      this.loading = true;
      OrderUserService.addOrder(this.preparedFormData()).then(
          () => {
            this.loading = false;
            this.$emit('added-order');
            this.hideModal();
            this.cleanForm();
          }
      )
    },
    simpleValidate() {
      let valid = true
      if (!this.form.price) {
        this.message = {'price': ['Поле "стоимость" обязательное!']}
        this.showMessage = true;
        valid = false;
      }
      if (!this.form.customer) {
        this.message = {'customer': ['Поле "заказчик" обязательное!']}
        this.showMessage = true;
        valid = false;
      }
      return valid
    },
    hideModal() {
      const truck_modal = document.querySelector('#modalAddOrder');
      const modal = Modal.getInstance(truck_modal);
      modal.hide();
    },
    hideMessage() {
      this.showMessage = false;
    }
  }
}
</script>

<style scoped>
.vue-select {
  width: 100%;
  margin-top: -8px;
  padding-top: 6px;
  padding-bottom: 8px;
}

.vue-input input {
  font-size: .9rem !important;
}
</style>