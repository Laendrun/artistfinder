<script setup>
  import PasswordModule from '@/components/adminViewV2/modules/PasswordModule.vue'
  import { reactive } from 'vue'

  const emits = defineEmits(['updated'])

  const props = defineProps({
    user: {
      type: Object
    }
  })

  const user_obj = reactive(props.user)

  const id = props.user.user_id

  const resetPassword = () => {
    const user_password = document.getElementById(`password_${id}`);
    const confirm_password = document.getElementById(`confirm_password_${id}`)
    const error = document.getElementById(`error_${id}`)
    const success = document.getElementById(`success_${id}`)
    const spinner = document.getElementById(`spinner_${id}`)

    if (user_password.value != confirm_password.value) {
      error.innerText = 'Les mots de passe doivent correspondre.'
      setTimeout(() => {
        error.innerText = ''
      }, 2500)
    } else if (user_password.value == '' || confirm_password.value == '') {
      error.innerText = 'Le mot de passe ne peut pas être vide.'
      setTimeout(() => {
        error.innerText = ''
      }, 2500);
    } else {
      // api request
      spinner.classList.toggle("d-none");
      fetch(`https://api.artistfinder.world/api/v1/users/${id}/resetPassword`, {
        method: 'PUT',
        headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          new_password: user_password.value,
          confirm_password: confirm_password.value
        })
      })
      .then(response => response.json())
      .then(data => {
        spinner.classList.toggle("d-none");
        user_password.value = ''
        confirm_password.value = ''
        if (data.type == 'success') {
          success.innerText = 'Mot de passe réinitialisé'
          emits('updated')
          setTimeout(() => {
            success.innerText = ''
          }, 2500);
        } else {
            console.log(data)
            error.innerText = data.message
            setTimeout(() => {
              error.innerText = ''
            }, 2500);
        }
      })
    }
  }

  const makeUser = () => {
    const spinner = document.getElementById(`spinner_${id}`)

    spinner.classList.toggle("d-none");
    fetch(`https://api.artistfinder.world/api/v1/users/${id}/user`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    })
    .then(response => response.json())
    .then(data => {
      spinner.classList.toggle("d-none");
      if (data.type == 'success') {
        emits('updated')
        user_obj.role_id = 10
      }
    });
  }

  const makeAdmin = () => {
    const spinner = document.getElementById(`spinner_${id}`)

    spinner.classList.toggle("d-none");
    fetch(`https://api.artistfinder.world/api/v1/users/${id}/admin`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    })
    .then(response => response.json())
    .then(data => {
      spinner.classList.toggle("d-none");
      if (data.type == 'success') {
        emits('updated')
        user_obj.role_id = 9
      }
    });
  }

  const blockUser = () => {
    const spinner = document.getElementById(`spinner_${id}`)

    spinner.classList.toggle("d-none");
    fetch(`https://api.artistfinder.world/api/v1/users/${id}/block`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    })
    .then(response => response.json())
    .then(data => {
      spinner.classList.toggle("d-none");
      if (data.type == 'success') {
        emits('updated')
        user_obj.user_blocked = 1
      }
    });
  }

  const unblockUser = () => {
    const spinner = document.getElementById(`spinner_${id}`)

    spinner.classList.toggle("d-none");
    fetch(`https://api.artistfinder.world/api/v1/users/${id}/unblock`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    })
    .then(response => response.json())
    .then(data => {
      spinner.classList.toggle("d-none");
      if (data.type == 'success') {
        emits('updated')
        user_obj.user_blocked  = 1
      }
    });
  }
</script>

<template>
  <!-- Modal -->
  <div class="modal modal-xl fade" :id="'modifyUserModal_'+id" tabindex="-1" :aria-labelledby="'modifyUserLabel_'+id" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" :id="'modifyUserLabel_'+id">Fiche utilisateur - {{ user_obj.user_username }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
          </div>
          <div class="modal-body">
            <div class="spinner-border text-primary d-none" :id="'spinner_'+id" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="row justify-content-center error" :id="'error_'+id"></div>
            <div class="row justify-content-center success" :id="'success_'+id"></div>
            <PasswordModule v-if="user_obj.user_login_type==0" @save="resetPassword" :id="id" />
            <br />
            <div class="row">
              <div class="col">
                <button v-if="props.user.role_id==10" class="btn btn-primary" @click="makeAdmin">
                  Rendre Administrateur
                  <font-awesome-icon icon="fa-solid fa-arrow-up" />
                </button>
                <button v-else class="btn btn-primary" disabled>
                  Rendre Administrateur
                  <font-awesome-icon icon="fa-solid fa-arrow-up" />
                </button>
              </div>
              <div class="col">
                <button v-if="props.user.role_id==9" class="btn btn-primary" @click="makeUser">
                  Rendre utilisateur
                  <font-awesome-icon icon="fa-solid fa-arrow-down" />
                </button>
                <button v-else class="btn btn-primary" disabled>
                  Rendre utilisateur
                  <font-awesome-icon icon="fa-solid fa-arrow-down" />
                </button>
              </div>
              <div class="col">
                <button v-if="user_obj.role_id != 9 && user_obj.user_blocked == 0" class="btn btn-primary" @click="blockUser">
                  Bloquer l'utilisateur
                  <font-awesome-icon icon="fa-solid fa-ban" />
                </button>
                <button v-else-if="user_obj.role_id != 9 && user_obj.user_blocked == 1" class="btn btn-primary" @click="unblockUser">
                  Débloquer l'utilisateur
                  <font-awesome-icon icon="fa-solid fa-check" />
                </button>
                <button v-else-if="user_obj.role_id == 9 && user_obj.user_blocked == 1" class="btn btn-primary" @click="blockUser">
                  Débloquer l'administrateur
                  <font-awesome-icon icon="fa-solid fa-check" />
                </button>
                <button v-else class="btn btn-primary" disabled>
                  Fonction bloquée
                  <font-awesome-icon icon="fa-solid fa-ban" />
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-bs-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
</template>

<style scoped>
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>