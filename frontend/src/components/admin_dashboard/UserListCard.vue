<script setup>

  const emit = defineEmits(['userUpdated']);
  const props = defineProps({
    user: {
      type: Object
    }
  })

  const makeAdmin = () => {
    fetch(`https://api.artistfinder.world/api/v1/users/${props.user.user_id}/admin`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    })
    .then(response => response.json())
    .then(data => {
      if (data.type == 'success') {
        emit('userUpdated')
      }
    });
  }

  const makeUser = () => {
    fetch(`https://api.artistfinder.world/api/v1/users/${props.user.user_id}/user`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    })
    .then(response => response.json())
    .then(data => {
      if (data.type == 'success') {
        emit('userUpdated')
      }
    });
  }

  const blockUser = () => {
    fetch(`https://api.artistfinder.world/api/v1/users/${props.user.user_id}/block`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    })
    .then(response => response.json())
    .then(data => {
      if (data.type == 'success') {
        emit('userUpdated')
      }
    });
  }

  const unblockUser = () => {
    fetch(`https://api.artistfinder.world/api/v1/users/${props.user.user_id}/unblock`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    })
    .then(response => response.json())
    .then(data => {
      if (data.type == 'success') {
        emit('userUpdated')
      }
    });
  }

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-1"></div>
        <div class="col-sm-10">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                {{ props.user.user_username }} - locked {{ props.user.user_blocked }}
                <font-awesome-icon v-if="props.user.role_id == 9" icon="fa-solid fa-user-tie" />
                <font-awesome-icon v-else-if="props.user.user_blocked == 1" icon="fa-solid fa-user-xmark" />
                <font-awesome-icon v-else-if="props.user.user_softDeleted == 1" icon="fa-solid fa-user-slash" />
                <font-awesome-icon v-else icon="fa-regular fa-user" />
              </h5>
              <span id="userId" hidden>{{ props.user.user_id}}</span>
              <p class="card-text" @click="">Réinitialiser le mot de passe</p>
              <p class="card-text" @click="">Changer le nom d'utilisateur</p>
              <p class="card-text" @click="">Changer l'email</p>
              <p class="card-text" @click="" v-if="props.user.user_login_type==1">Changer le type de connexion</p>
              <p class="card-text">
                <div class="row justify-content-center">
                  <div class="col-sm-2" v-if="props.user.role_id != 9">
                    <button class="btn btn-primary" @click="makeAdmin"><font-awesome-icon icon="fa-solid fa-arrow-up" /></button>
                  </div>
                  <div class="col-sm-2" v-if="props.user.role_id != 10">
                    <button class="btn btn-primary" @click="makeUser"><font-awesome-icon icon="fa-solid fa-arrow-down" /></button>
                  </div>
                  <div class="col-sm-2" v-if="props.user.user_blocked == 0 && props.user.role_id != 9">
                    <button class="btn btn-primary" @click="blockUser"><font-awesome-icon icon="fa-solid fa-ban" /></button>
                  </div>
                  <div class="col-sm-2" v-if="props.user.user_blocked == 1">
                    <button class="btn btn-primary" @click="unblockUser"><font-awesome-icon icon="fa-solid fa-check" /></button>
                  </div>
                </div>
              </p>
            </div>
          </div>
        </div>
      <div class="col-sm-1"></div>
    </div>
  </div>
</template>