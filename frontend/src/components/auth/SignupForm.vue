<script setup>

  const signup = () => {
    const user_lname = document.getElementById('lname').value;
    const user_fname = document.getElementById('fname').value;
    const user_username = document.getElementById('username').value;
    const user_email = document.getElementById('email').value;
    const user_password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    const error = document.getElementById('error');

    if (!user_lname || !user_fname || !user_username || !user_email || !user_password || !confirm_password) {
      error.innerText = 'Tous les champs doivent être remplis.'
      setTimeout(() => {
        error.innerText = ''
      }, 5000);
    } else {
      const body = {
        user_lname,
        user_fname,
        user_username,
        user_email,
        user_password,
        confirm_password
      }
      fetch('https://api.artistfinder.world/api/v1/auth/signup', {
        method: "POST",
        body: JSON.stringify(body), 
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.status == 400) {
          error.innerText = data.message
          setTimeout(() => {
            error.innerText = ''
          }, 5000);
        } else if (data.status == 500) {
          console.log(data.message)
          error.innerText = 'Erreur serveur'
          setTimeout(() => {
            error.innerText = ''
          }, 5000);
        } else {
          window.localStorage.setItem('Authorization', data.token);
          window.location.replace('https://www.artistfinder.world/profile')
        }
      });
    }
  }

</script>

<template>
  <div class="signupFormComp">
    <div class="row justify-content-center">
      <div id="error"></div>
      <h1>Inscription</h1>
      <form @submit.prevent>
        <div class="row">
          <div class="col-sm-6">
            <!-- Fname -->
            <div class="form-outline mb-4">
              <input type="text" id="fname" class="form-control" />
              <label class="form-label" for="fname">Prénom</label>
            </div>
          </div>
          <div class="col-sm-6">
            <!-- lname -->
            <div class="form-outline mb-4">
              <input type="text" id="lname" class="form-control" />
              <label class="form-label" for="lname">Nom</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <!-- Username -->
            <div class="form-outline mb-4">
              <input type="text" id="username" class="form-control" />
              <label class="form-label" for="username">Nom d'utilisateur</label>
            </div>
          </div>
          <div class="col-sm-6">
            <!-- Email -->
            <div class="form-outline mb-4">
              <input type="email" id="email" class="form-control" />
              <label class="form-label" for="email">Email</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <!-- Password input-->
            <div class="form-outline mb-4">
              <input type="password" id="password" class="form-control" />
              <label class="form-label" for="password">Mot de passe</label>
            </div>
          </div>
          <div class="col-sm-6">
            <!-- Confirm Password input-->
            <div class="form-outline mb-4">
              <input type="password" id="confirm_password" class="form-control" />
              <label class="form-label" for="confirm_password">Confirmer le mot de passe</label>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-sm-6">
            <div class="form-outline mb-4">
              <button @click="signup" class="btn btn-primary">Inscription</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  // import bla from ''

  export default {
    name: 'SignupForm',
    components: {

    }
  }
</script>

<style scoped></style>