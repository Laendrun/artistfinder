<script setup>
const authHeader = `Bearer ${localStorage.getItem('Authorization')}`;

const getData = async() => {
  let userData = await fetch('https://api.artistfinder.world/api/v1/users/infos', {
    method: 'GET',
    headers: {
      'Authorization': authHeader,
    }
  });
  let userJson = await userData.json();
  return userJson;
}

const logout = () => {
  localStorage.removeItem('Authorization');
  window.location.replace('https://www.artistfinder.world/')
}

const data = await getData();

const user_lname = data.user_lname
const user_fname = data.user_fname
const user_email = data.user_email
const user_username = data.user_username

</script>

<script>
export default {
  name: 'GeneralInformation'
}
</script>

<template>
  <div class="generalInformationComp container">
    <div class="row">
      <div class="col-sm-10 col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Informations Générales</h5>
            <ul class="list-group">
              <li class="list-group-item">Nom : {{ user_lname }}</li>
              <li class="list-group-item">Prénom :  {{ user_fname }}</li>
              <li class="list-group-item">Nom d'utilisateur : {{ user_username }}</li>
              <li class="list-group-item">Email : {{ user_email }}</li>
            </ul>
            <button @click="logout" class="btn">Déconnexion</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>