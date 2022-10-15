<script setup>
  const login = (e) => {
    const user_username = document.getElementById('username').value;
    const user_password = document.getElementById('password').value;
    const error = document.getElementById('error');
    if (!user_username || !user_password) {
      error.innerText = 'Nom d\'utilisateur et mot de passe ne doivent pas être vide.'
      setTimeout(() => {
        error.innerText = ''
      }, 5000);
    } else {
      fetch('https://api.artistfinder.world/api/v1/auth/signin', {
        method: "POST",
        body: JSON.stringify({
          user_username: user_username,
          user_password: user_password
        }), 
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(res => res.json())
      .then(data => {
        window.localStorage.setItem('Authorization', data.token);
        window.location.replace('https://www.artistfinder.world/profile')
      });
    }

  }
</script>

<script>

  //const user_username = document.getElementById('username');
  //const user_password = document.getElementById('password');
  //console.log('Username : ', user_username);
  //console.log('Password : ', user_password);

export default {
  name: 'SigninForm',
}
</script>

<template>
  <div class="signinForm">
    <h1>Connexion</h1>
    <div class="row justify-content-center">
      <div id="error"></div>
      <form @submit.prevent class="col-md-6 col-sm-10">
      <!-- Username or Email input -->
      <div class="form-outline mb-4">
        <input type="text" id="username" class="form-control" />
        <label class="form-label" for="username">Nom d'utilisateur ou email</label>
      </div>
      <!-- Password input -->
      <div class="form-outline mb-4">
        <input type="password" id="password" class="form-control" />
        <label class="form-label" for="password">Mot de passe</label>
      </div>
      <div class="form-outline mb-4">
        <button @click="login" class="btn btn-primary">Connexion</button>
      </div>
    </form>
    </div>
  </div>
</template>

<style scope>
  #error {
    color: red;
  }
</style>