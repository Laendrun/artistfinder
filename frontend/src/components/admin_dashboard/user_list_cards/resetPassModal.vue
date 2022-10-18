<script setup>

const emits = defineEmits(['pass_changed']);

const props = defineProps({
  id: {
    type: Number
  }
})
</script>

<template>
  <!-- Modal -->
  <div class="modal fade" :id="'resetPasswordModal_'+props.id" tabindex="-1" :aria-labelledby="'resetPassLabel'+props.id" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" :id="'resetPassLabel_'+props.id">Réinitialiser le mot de passe</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
        </div>
        <div class="modal-body">
          <div class="row justify-content-center">
            <div class="spinner-border text-primary d-none" :id="'passSpinner_'+props.id" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="modalPassError" :id="'modalPassError_'+props.id"></div>
            <div :id="'modalPassSuccess_'+props.id"></div>
            <form @submit.prevent class="col-md-6 col-sm-10">
            <!-- new_password input -->
            <div class="form-outline mb-4">
              <input type="text" :id="'data1_'+props.id" class="form-control" />
              <label class="form-label" :for="'data1_'+props.id">Mot de passe</label>
            </div>
            <!-- confirm_password input -->
            <div class="form-outline mb-4">
              <input type="text" :id="'data2_'+props.id" class="form-control" />
              <label class="form-label" :for="'data2_'+props.id">Confirmer le mot de passe</label>
            </div>
          </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" data-bs-dismiss="modal">Annuler</button>
          <button @click="emits('pass_changed')" type="button" class="btn">Enregistrer</button>
        </div>
      </div>
    </div>
  </div>
  <!-- End Modal -->
</template>

<style scoped>
  .modalPassError {
    color: red;
  }
</style>