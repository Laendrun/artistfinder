<script setup>
  const props = defineProps({
    id: {
      type: Number
    }
  })
  const emits = defineEmits(['save'])

  const id = props.id

</script>

<template>
  <!-- Password -->
  <div class="row">
    <p>Modifier le mot de passe :</p>
  </div>
  <div class="row justify-content-center">
    <div class="col">
      <input type="password" class="form-control" :id="'password_'+id" />
    </div>
    <div class="col">
      <input type="password" class="form-control" :id="'confirm_password_'+id" />
    </div>
    <div class="col">
      <button @click="emits('save')" class="btn btn-primary">Modifier</button>
    </div>
  </div>
  <!-- End Password -->
</template>

<style scoped>
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>