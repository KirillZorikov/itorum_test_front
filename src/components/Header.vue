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
              <router-link :to="{name: '404'}" class="nav-link text-dark"
                           :class="{'active-link': ['Home', 'Recipe', 'Author'].includes(currentRouteName)}">
                Заказы за неделю
              </router-link>
            </li>
            <li class="nav-item li-nav p-2">
              <router-link :to="{name: '404'}" class="nav-link text-dark"
                           :class="{'active-link': currentRouteName === 'Follow'}">
                Все заказы
              </router-link>
            </li>
            <li class="nav-item li-nav p-2">
              <router-link :to="{name: '404'}" class="nav-link text-dark"
                           :class="{'active-link': currentRouteName === 'AddRecipe'}">
                Экспорт заказов
              </router-link>
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
          <!--          <template v-if="!currentUser">-->
          <!--            <router-link :to="{name: '404'}" class="nav-link text-dark">Войти</router-link>-->
          <!--            <router-link :to="{name: '404'}">-->
          <!--              <button class="button button-blue" href="#" tabindex="-1" aria-disabled="true">Создать аккаунт</button>-->
          <!--            </router-link>-->
          <!--          </template>-->
          <!--          <template v-else>-->
          <!--            <router-link :to="{name: '404'}" class="nav-link text-dark">Изменить пароль</router-link>-->
          <!--            <router-link :to="{name: '404'}" class="nav-link text-dark">Выход</router-link>-->
          <!--          </template>-->
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
export default {
  name: "Nav",
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
            this.$router.push({name: '404'});
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