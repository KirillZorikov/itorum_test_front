<template>
  <button type="button" class="btn delete-button text-light pt-2 pb-2 h-100 me-2"
          data-bs-toggle="modal" data-bs-target="#modalDeleteOrder">
    <i class="fas fa-trash fs-5"></i>
    Удалить
  </button>

  <!-- Modal -->
  <div class="modal fade" id="modalDeleteOrder" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Удаление</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Вы точно хотите удалить выбранные заказы?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-primary" @click="deleteOrders">Удалить</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->

</template>

<script>
import {OrderUserService} from "../services/auth-required.services";
import {Modal} from "bootstrap";

export default {
  name: "DeleteOrder",
  props: ['orders'],
  emits: ['deleted-orders'],
  methods: {
    deleteOrders() {
      OrderUserService.deleteListOrders(this.orders).then(
          () => {
            this.$emit('deleted-orders');
            this.hideModal();
          }
      )
    },
    hideModal() {
      const truck_modal = document.querySelector('#modalDeleteOrder');
      const modal = Modal.getInstance(truck_modal);
      modal.hide();
    }
  }
}
</script>

<style scoped>

</style>