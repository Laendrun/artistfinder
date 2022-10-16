<script setup>
  const emit = defineEmits(['userUpdated']);

  const logout = () => {
    localStorage.removeItem('Authorization');
    window.location.replace('https://www.artistfinder.world/')
  }

  const updated = () => {
    emit('userUpdated')
  }
</script>

<script>
import EditInfosModal from '@/components/user_profile/EditInfosModal.vue'

export default {
  name: 'GeneralInformation',
  components: {
    EditInfosModal,
  },
  props: {
    data: Object
  }
}
</script>

<template>
  <div class="generalInformationComp">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Informations Générales 
            <font-awesome-icon id="editIcon" data-bs-toggle="modal" data-bs-target="#testEdit" icon="fa-solid fa-pen" />
          </h5>
          <div id="error"></div>
          <div id="success"></div>
          <ul class="list-group">
            <li class="list-group-item" id="lnameLabel">Nom : {{ data.user_lname }}</li>
            <li class="list-group-item" id="fnameLabel">Prénom :  {{ data.user_fname }}</li>
            <li class="list-group-item" id="usernameLabel">Nom d'utilisateur : {{ data.user_username }}</li>
            <li class="list-group-item" id="emailLabel">Email : {{ data.user_email }}</li>
          </ul>
          <button @click="logout" class="btn">Déconnexion</button>
          <RouterLink v-if="data.role_id == 9" to="/admin" class="btn">Administrateur</RouterLink>
        </div>
      </div>
    </div>
    <EditInfosModal id="testEdit" :data="data" @userUpdated="updated" />
  </div>
</template>

<style scoped>
  #editIcon {
    cursor: pointer
  }
  #error {
    color: red;
  }
</style>