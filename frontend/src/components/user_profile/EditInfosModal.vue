<script setup>

  const emit = defineEmits(['userUpdated'])

  const updateUser = () => {
    const user_id = document.getElementById('data0').innerText;
    const username = document.getElementById('data3').value;
    const fname = document.getElementById('data2').value;
    const lname = document.getElementById('data1').value;
    const email = document.getElementById('data4').value;

    const body = {
      user_fname: fname,
      user_lname: lname,
      user_username: username,
      user_email: email
    }

    fetch(`https://api.artistfinder.world/api/v1/users/${user_id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('Authorization')}`, 
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          if (data.status == 400) {
            document.getElementById('error').innerText = 'Nom d\'utilisateur indisponible.'
          } else {
            document.getElementById('error').innerText = 'Une erreur s\'est produite lors de la mise à jour de l\'utilisateur.';
          }
          setTimeout(() => {
            document.getElementById('error').innerText = ''
          }, 1000)
        } else {
          emit('userUpdated');
          document.getElementById('success').innerText = 'Utilisateur mis à jour.'
          localStorage.setItem('Authorization', data.token)
          setTimeout(() => {
            document.getElementById('success').innerText = ''
          }, 1000)
        }
      });
  }
</script>

<script>
export default {
  name: 'EditInfosModal',
  props: {
    id: String,
    data: Object,
  }
}
</script>

<template>
  <div>
    <span hidden id="data0">{{ data.user_id }}</span>
    <span hidden id="data5">{{ id }}</span>
    <!-- Modal -->
    <div class="modal fade" :id="id" tabindex="-1" aria-labelledby="editInfosLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editInfosLabel">Modifiez les informations</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
          </div>
          <div class="modal-body">
            <div class="row justify-content-center">
              <form @submit.prevent class="col-md-6 col-sm-10">
              <!-- Lname input -->
              <div class="form-outline mb-4">
                <input type="text" id="data1" :value="data.user_lname" class="form-control" />
                <label class="form-label" for="data1">Nom</label>
              </div>
              <!-- Fname input -->
              <div class="form-outline mb-4">
                <input type="text" id="data2" :value="data.user_fname" class="form-control" />
                <label class="form-label" for="data2">Prénom</label>
              </div>
              <!-- Username input -->
              <div class="form-outline mb-4">
                <input type="text" id="data3" :value="data.user_username" class="form-control" />
                <label class="form-label" for="data3">Nom d'utilisateur</label>
              </div>
              <!-- Email input -->
              <div v-if="data.login_type == 0" class="form-outline mb-4">
                <input type="text" id="data4" :value="data.user_email" class="form-control" />
                <label class="form-label" for="data4">Email</label>
              </div>
              <div v-else class="form-outline mb-4">
                <input type="text" disabled id="data4" :value="data.user_email" class="form-control" />
                <label class="form-label" for="data4">Email (Non modifiable, connecté avec Google)</label>
              </div>
            </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-bs-dismiss="modal">Annuler</button>
            <button @click="updateUser" data-bs-dismiss="modal" type="button" class="btn">Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>