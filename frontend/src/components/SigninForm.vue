<script>
import GoogleSignin from '@/components/GoogleSignin.vue'
export default {
  name: 'SigninForm',
  components: {
    GoogleSignin
  }
}
</script>

<template>
  <div class="signinForm">
    <h1>Connexion</h1>
    <div class="row justify-content-center">
      <form class="col-md-6 col-sm-10">
      <!-- Username or Email input -->
      <div class="form-outline mb-4">
        <input type="text" id="user_username" class="form-control" />
        <label class="form-label" for="user_username">Nom d'utilisateur ou email</label>
      </div>
      <!-- Password input -->
      <div class="form-outline mb-4">
        <input type="password" id="user_password" class="form-control" />
        <label class="form-label" for="user_password">Mot de passe</label>
      </div>
    </form>
    </div>
    <GoogleSignin />
  </div>
</template>