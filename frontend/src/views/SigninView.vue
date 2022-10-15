<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Connexion'
})
</script>

<script>
// @ is an alias to /src
import SigninForm from '@/components/SigninForm.vue'
import GoogleSignin from '@/components/auth/GoogleSignin.vue'

export default {
  name: 'SigninView',
  components: {
    SigninForm,
    GoogleSignin
  }
}
</script>

<template>
  <div class="container">
    <SigninForm />
    <GoogleSignin />
  </div>
</template>