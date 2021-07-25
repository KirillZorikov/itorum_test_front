<template>
  <nav class="navbar navbar-expand-md navbar-light bg-transparent-white p-0">
    <div class="wrapper">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
              aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto my-2 my-lg-0">
            <li class="nav-item li-nav p-2">
              <router-link :to="{name: 'Home'}" class="nav-link text-dark"
                           :class="{'active-link': currentRouteName === 'Home'}">
                Заказы за неделю
              </router-link>
            </li>
            <li class="nav-item li-nav p-2">
              <router-link :to="{name: 'Orders'}" class="nav-link text-dark"
                           :class="{'active-link': currentRouteName === 'Orders'}">
                Все заказы
              </router-link>
            </li>
            <li class="nav-item li-nav p-2">
              <ExportOrders/>
            </li>
          </ul>
          <div class="dropdown me-3">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2"
                    data-bs-toggle="dropdown" aria-expanded="false">
              <i class="far fa-user me-1"></i>
              <template v-if="currentUser">{{ currentUser.username }}</template>
              <template v-else>Пользователь</template>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
              <template v-if="currentUser">
                <li>
                  <button class="dropdown-item pb-0 pt-0" @click="handleLogout">
                    <i class="fas fa-sign-in-alt me-1"></i>Выход
                  </button>
                </li>
              </template>
              <template v-else>
                <li>
                  <router-link :to="{name: 'Login'}" class="dropdown-item pb-0 pt-0">
                    <i class="fas fa-sign-in-alt me-1"></i>Вход
                  </router-link>
                </li>
                <li>
                  <router-link :to="{name: 'Register'}" class="dropdown-item pb-0 pt-0" href="#">
                    <i class="fas fa-pencil-alt me-1"></i>Регистрация
                  </router-link>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import ExportOrders from "./ExportOrders";
export default {
  name: "Nav",
  components: {ExportOrders},
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout').then(
          () => {
            console.log(this.$route.name)
            this.$router.push({name: 'Home'});
          }
      )
    }
  }
}
</script>

<style scoped>
.active-link {
  color: white !important;
  background-color: royalblue;
  border-radius: .7rem !important;
}

.li-nav {
  width: fit-content;
}
</style>