<template>
  <div class="wrapper ps-4 pe-4">
    <div class="d-flex justify-content-center main-block-wrapper">
      <div class="main-block d-flex align-items-center justify-content-center mt-3">
        <div>
          <h1>Ошибка 404</h1>
          <p>Страница <code>{{ from_url }}</code> не найдена</p>
          <!--        <p class="lead"><router-link :to="{name: 'Home'}">Вернуться на главную</router-link></p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  title: 'Ошибка 404',
  props: [
    'from_url'
  ]
}
</script>

<style scoped>
</style>