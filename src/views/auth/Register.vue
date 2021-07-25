<template>
  <div class="wrapper mb-5">
    <h1 class="fw-bold mt-5 mb-5 header">Регистрация</h1>

    <div v-if="showMessage" class="row mt-1 mb-1 d-flex justify-content-center w-100">
      <div class="alert alert-danger d-flex align-items-center" style="width: fit-content;" role="alert">
          <span class="mt-1">
            <span v-if="message.username">{{ message.username.join() }}</span>
            <span v-if="message.password">{{ message.password.join() }}</span>
            <template v-if="!message">
              <span class="d-block">Введены невалидные данные.</span>
              <span class="d-block">Попробуйте ещё раз.</span>
            </template>
          </span>
        <button type="button" class="ml-1 p-0 ms-2 btn bg-transparent shadow-none h-100 d-flex align-items-start"
                @click="deleteMessage"
                data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" class="fs-3" style="margin-top: -10px">&times;</span>
        </button>
      </div>
    </div>

    <div class="d-flex justify-content-center align-items-center form-wrapper">
      <form class="form needs-validation" @submit.prevent="handleRegister">

        <div class="mb-3 row">
          <label for="inputUsername" class="col-5 col-form-label p-0 fs-5">Имя пользователя</label>
          <div class="col-7 ps-3 pe-0 d-flex flex-row">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-id-badge fa-fw fs-5"></i>
              </span>
            </div>
            <input
                v-model="user.username"
                type="text"
                class="form-control rounded-0 rounded-end"
                id="inputUsername"
                required
                :class="{'is-invalid': showMessage && (message.username || !message)}"
            >
          </div>
        </div>

        <div class="mb-3 row">
          <label for="inputPassword" class="col-5 col-form-label p-0 fs-5">Пароль</label>
          <div class="col-7 ps-3 pe-0 d-flex flex-row">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-lock fa-fw fs-5"></i>
              </span>
            </div>
            <input
                v-model="user.password"
                type="password"
                class="form-control rounded-0 rounded-end"
                id="inputPassword"
                required
                :class="{'is-invalid': showMessage && (message.password || !message)}"
            >
          </div>
        </div>

        <div class="mb-3 row">
          <label for="inputPassword2" class="col-5 col-form-label p-0 fs-5">Повторите пароль</label>
          <div class="col-7 ps-3 pe-0 d-flex flex-row">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-lock fa-fw fs-5"></i>
              </span>
            </div>
            <input
                v-model="password2"
                type="password"
                class="form-control rounded-0 rounded-end"
                id="inputPassword2"
                required
                :class="{'is-invalid': showMessage && (message.password || !message)}"
            >
          </div>
        </div>

        <div class="d-flex justify-content-center mt-4 align-items-end">
          <button type="submit" class="button button-blue" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm me-1"></span>
            <span>Регистрация</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import User from '../../models/user';

export default {
  name: "Register",
  title: 'Регистрация',
  data() {
    return {
      user: new User(),
      loading: false,
      showMessage: false,
      password2: '',
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    handleRegister() {
      if (this.user.username && this.user.password) {
        if (this.user.password.length < 5) {
          this.message = {'password': ['Минимальная длина пароля - 5 символов!']}
          this.showMessage = true;
          return
        }
        this.loading = true;
        this.user.password2 = this.password2
        this.loading = true;
        this.$store.dispatch('auth/register', this.user).then(
            () => {
              this.$store.dispatch('auth/login', this.user).then(
                  () => {
                    this.$router.push({name: 'Home', params: {message: 'Вы успешно зарегистрировались!'}});
                  },
                  () => {
                    this.$router.push({name: 'Login'});
                  }
              )
            },
            error => {
              this.loading = false;
              if (error.response.status === 400) {
                this.showMessage = true;
                this.message = error.response.data;
                if (this.message.username) {
                  this.message.username = ['Пользователь с таким ником уже существует!'];
                }
              }
            }
        );
      }
    },
    deleteMessage() {
      this.showMessage = false;
    }
  }
}
</script>

<style scoped>

</style>