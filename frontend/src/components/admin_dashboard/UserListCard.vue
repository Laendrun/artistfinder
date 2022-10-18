<script setup>
import { reactive } from 'vue'
import ResetPassModal from '@/components/admin_dashboard/user_list_cards/resetPassModal.vue';

  const emit = defineEmits(['userUpdated']);
  const props = defineProps({
    user_prop: {
      type: Object
    }
  })

  const user = props.user_prop
  const user_obj = reactive(user)

  const makeAdmin = () => {
    fetch(`https://api.artistfinder.world/api/v1/users/${user_obj.user_id}/admin`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    })
    .then(response => response.json())
    .then(data => {
      if (data.type == 'success') {
        user_obj.role_id = 9
      }
    });
  }

  const makeUser = () => {
    fetch(`https://api.artistfinder.world/api/v1/users/${user_obj.user_id}/user`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    })
    .then(response => response.json())
    .then(data => {
      if (data.type == 'success') {
        user_obj.role_id = 10
      }
    });
  }

  const blockUser = () => {
    fetch(`https://api.artistfinder.world/api/v1/users/${user_obj.user_id}/block`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    })
    .then(response => response.json())
    .then(data => {
      if (data.type == 'success') {
        user_obj.user_blocked = 1
      }
    });
  }

  const unblockUser = () => {
    fetch(`https://api.artistfinder.world/api/v1/users/${user_obj.user_id}/unblock`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    })
    .then(response => response.json())
    .then(data => {
      if (data.type == 'success') {
        user_obj.user_blocked = 0
      }
    });
  }

  const resetPassword = () => {

    const new_password = document.getElementById(`data1_${user_obj.user_id}`);
    const confirm_password = document.getElementById('data2_'+user_obj.user_id);
    const passSuccess = document.getElementById('modalPassSuccess_'+user_obj.user_id);
    const passError = document.getElementById('modalPassError_'+user_obj.user_id);
    const passSpinner = document.getElementById('passSpinner_'+user_obj.user_id);
    
    if (new_password.value != confirm_password.value) {
      passError.innerText = 'Les mots de passes doivent correspondre.'
      setTimeout(() => {
        passError.innerText = ''
      }, 2500);
    } else if (new_password.value == '' || confirm_password.value == '') {
      passError.innerText = 'Le mot de passe ne peut pas être vide.'
      setTimeout(() => {
        passError.innerText = ''
      }, 2500);
    } else {
      passSpinner.classList.toggle("d-none");
      fetch(`https://api.artistfinder.world/api/v1/users/${user_obj.user_id}/resetPassword`, {
        method: 'PUT',
        headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          new_password: new_password.value,
          confirm_password: confirm_password.value
        })
      })
      .then(response => response.json())
      .then(data => {
        passSpinner.classList.toggle("d-none");
        new_password.value = ''
        confirm_password.value = ''
        if (data.type == 'success') {
            passSuccess.innerText = 'Mot de passe réinitialisé'
            setTimeout(() => {
              passSuccess.innerText = ''
            }, 2500);
        } else {
            console.log(data)
            passError.innerText = data.message
            setTimeout(() => {
              passError.innerText = ''
            }, 2500);
        }
      })
    }
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
                {{ user_obj.user_username }}
                <font-awesome-icon v-if="user_obj.role_id == 9" icon="fa-solid fa-user-tie" />
                <font-awesome-icon v-else-if="user_obj.user_blocked == 1" icon="fa-solid fa-user-xmark" />
                <font-awesome-icon v-else-if="user_obj.user_softDeleted == 1" icon="fa-solid fa-user-slash" />
                <font-awesome-icon v-else icon="fa-regular fa-user" />
              </h5>
              <hr />
              <p class="card-text" v-if="user_obj.user_login_type != 1">Mot de passe
                <button class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#resetPasswordModal_'+user_obj.user_id">
                  <font-awesome-icon icon="fa-solid fa-pen" />
                </button>
              </p>
              <ResetPassModal :id="user_obj.user_id" @pass_changed="resetPassword" />
              <p class="card-text">Nom d'utilisateur
                <button class="btn btn-primary">
                  <font-awesome-icon icon="fa-solid fa-pen" />
                </button>
              </p>

              <p class="card-text" @click="">Adresse Email
                <button class="btn btn-primary">
                  <font-awesome-icon icon="fa-solid fa-pen" />
                </button>
              </p>
              <hr />
              <p class="card-text" v-if="user_obj.role_id!=9">
                <button class="btn btn-primary" @click="makeAdmin">
                  Rendre administrateur
                  <font-awesome-icon icon="fa-solid fa-arrow-up" />
                </button>
              </p>
              
              <p class="card-text" v-if="user_obj.role_id!=10">
                <button class="btn btn-primary" @click="makeUser">
                  Rendre utilisateur
                  <font-awesome-icon icon="fa-solid fa-arrow-down" />
                </button>
              </p>

              <p class="card-text" v-if="user_obj.user_blocked==0&&user_obj.role_id!=9">
                <button class="btn btn-primary" @click="blockUser">
                  Bloquer l'utilisateur
                  <font-awesome-icon icon="fa-solid fa-ban" />
                </button>
              </p>

              <p class="card-text" v-if="user_obj.user_blocked == 1">
                <button class="btn btn-primary" @click="unblockUser">
                  Débloquer l'utilisateur
                  <font-awesome-icon icon="fa-solid fa-check" />
                </button>
              </p>

              <p class="card-text" @click="" v-if="user_obj.user_login_type==1">
                <button class="btn btn-primary" @click="switchLogin">
                  Changer la connexion
                  <font-awesome-icon icon="fa-solid fa-shuffle" />
                </button>
              </p>

            </div>
          </div>
        </div>
      <div class="col-sm-1"></div>
    </div>
  </div>
</template>