<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Connexion'
})
</script>

<script>
// @ is an alias to /src
import SigninForm from '@/components/auth/SigninForm.vue'
import GoogleSignin from '@/components/auth/GoogleSignin.vue'
import NotRegisteredBtn from '@/components/auth/NotRegisteredBtn.vue'

export default {
  name: 'SigninView',
  components: {
    SigninForm,
    GoogleSignin,
    NotRegisteredBtn
  }
}
</script>

<template>
  <div class="container">
    <SigninForm class="signinForm" />
    <NotRegisteredBtn class="notRegBtn" />
    <GoogleSignin class="googleSign" />
  </div>
</template>

<style scoped>
  .signinForm .notRegBtn {
    margin-bottom: 3vh;
  }
  .googleSign {
    margin-top: 3vh;
  }
</style>