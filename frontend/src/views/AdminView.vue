<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Tableau de bord Administrateur'
})
</script>

<script>
// @ is an alias to /src

export default {
  name: 'AdminView',
  components: {
  }
}
</script>

<template>
  <div class="adminView">
    <div class="row">
      <div class="col-sm-1 col-md-3"></div>
      <div class="col-sm-10 col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Administrateur</h5>
          </div>
        </div>
      </div>
      <div class="col-sm-1 col-md-3"></div>
    </div>
  </div>
</template>