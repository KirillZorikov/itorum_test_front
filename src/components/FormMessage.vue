<template>
  <div v-if="showMessage" class="row mt-1 mb-1 d-flex justify-content-center w-100">
    <div class="alert alert-danger d-flex align-items-center" style="width: fit-content;" role="alert">
          <span class="mt-1">
            <template v-for="type in Object.keys(message)" :key="type">
              <span class="d-block" v-if="message[type]">{{ message[type].join() }}</span>
            </template>
            <template v-if="!Object.keys(message).length">
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
</template>

<script>
export default {
  name: "FormMessage",
  props: ['message'],
  emits: ['hide-message'],
  data() {
    return {
      showMessage: true
    }
  },
  methods: {
    deleteMessage() {
      this.showMessage = false;
      this.$emit('hide-message');
    }
  }
}
</script>

<style scoped>

</style>