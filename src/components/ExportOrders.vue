<template>
  <button type="button" @click="downloadOrders"
          class="btn bg-transparent shadow-none nav-link text-dark"
  >
    Экспорт заказов
  </button>

  <!-- Modal -->
  <div class="modal fade" id="modalExportOrders" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <form @submit.prevent="handleLogin">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Вход</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="ps-4 pe-1">
              <FormMessage v-if="showMessage" :message="message" @hide-message="hideMessage"/>
            </div>

            <div class="mb-3 row ps-3 pe-3">
              <label for="inputUsername" class="col-5 col-form-label p-0 fs-6">Имя пользователя</label>
              <div class="col-7 ps-3 pe-0 d-flex flex-row">
                <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-id-badge fa-fw fs-6"></i>
              </span>
                </div>
                <input
                    v-model="user.username"
                    type="text"
                    class="form-control rounded-0 rounded-end"
                    id="inputUsername"
                    required
                    :class="{'is-invalid': showMessage && !message}"
                >
              </div>
            </div>

            <div class="mb-3 row ps-3 pe-3">
              <label for="inputPassword" class="col-5 col-form-label p-0 fs-6">Пароль</label>
              <div class="col-7 ps-3 pe-0 d-flex flex-row">
                <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-lock fa-fw fs-6"></i>
              </span>
                </div>
                <input
                    v-model="user.password"
                    type="password"
                    class="form-control rounded-0 rounded-end"
                    id="inputPassword"
                    required
                    :class="{'is-invalid': showMessage && !message}"
                >
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
            <button type="submit" class="btn btn-primary">
              <span v-show="loading" class="spinner-border spinner-border-sm me-1"></span>
              <span>Войти</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- Modal -->

</template>

<script>
import {Modal} from "bootstrap";
import {OrderUserService} from "../services/auth-required.services";
import FormMessage from "./FormMessage";
import User from '../models/user';

export default {
  name: "ExportOrders",

  NOT_ALLOWED_EXC: ['Войдите за пользователя с правами на экспорт заказов.'],

  components: {FormMessage},
  data() {
    return {
      user: new User(),
      message: '',
      showMessage: false,
      loading: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    downloadOrders() {
      if (!this.currentUser) {
        this.$router.push({name: 'Login'});
        return;
      }
      this.message = '';
      this.showMessage = false;
      OrderUserService.exportOrders().then(
          response => {
            this.hideModal()
            let fileURL = window.URL.createObjectURL(new Blob([response.data]));
            let fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'orders_list.json');
            document.body.appendChild(fileLink);
            fileLink.click();
          },
          error => {
            this.showMessage = true;
            if (error.response.status === 403) {
              this.message = {exception: this.$options.NOT_ALLOWED_EXC};
              this.showModal();
            }
          }
      );
    },
    hideModal() {
      this.user = new User();
      const truck_modal = document.querySelector('#modalExportOrders');
      const modal = Modal.getInstance(truck_modal);
      if (modal) {
        modal.hide();
      }
    },
    showModal() {
      const modal = new Modal(document.getElementById("modalExportOrders"), {})
      modal.show();
    },
    hideMessage() {
      this.showMessage = false;
    },
    handleLogin() {
      if (this.user.username && this.user.password) {
        this.loading = true;
        this.message = '';
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.downloadOrders();
            },
            error => {
              this.loading = false;
              this.showMessage = true;
              if (error.response.status === 403) {
                this.message = {exception: this.$options.NOT_ALLOWED_EXC};
              }
            }
        );
      }
    },
  }
}

</script>

<style scoped>

</style>