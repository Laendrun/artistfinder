<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Connexion'
})
</script>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import SigninForm from '@/components/SigninForm.vue'

export default {
  name: 'SigninView',
  components: {
    SigninForm,
    Navbar
  }
}
</script>

<template>
  <Navbar />
  <div class="container">
    <SigninForm />
  </div>
</template>