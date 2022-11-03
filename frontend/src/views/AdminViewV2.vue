<script setup>
  import { onMounted } from 'vue'
  import UserListObject from '@/components/adminViewV2/UserListObject.vue'

  const getData = async() => {
    let usersData = await fetch('https://api.artistfinder.world/api/v1/users/', {
      method: 'GET',
      headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
    });
    let usersJson = await usersData.json();
    return usersJson;
  }

  async function updated() {
    console.log('updated')
    const dat = await getData();
    return dat;
  }

  const users = await updated()

  onMounted(() => {
    document.title = 'Gestion utilisateurs'
  })
</script>

<template>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nom d'utilisateur</th>
          <th>Nom complet</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Modifier</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <UserListObject v-for="user in users" :user_prop="user" @updated="updated" />
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>