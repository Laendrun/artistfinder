<script setup>
import AdminInfo from '@/components/admin_dashboard/AdminInfo.vue'
import UserListCard from '@/components/admin_dashboard/UserListCard.vue'
import { onMounted } from 'vue'

const getData = async() => {
  let usersData = await fetch('https://api.artistfinder.world/api/v1/users/', {
    method: 'GET',
    headers: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}`}
  });
  let usersJson = await usersData.json();
  return usersJson;
}

async function updated() {
  const dat = await getData();
  return dat;
}

const users = await updated()

//const users = await getData()
onMounted(() => {
  document.title = 'Gestion utilisateurs'
})
</script>

<script>
// @ is an alias to /src


export default {
  name: 'AdminView',
}
</script>

<template>
  <div class="adminView">
    <div class="container">
      <!--<AdminInfo />-->
      <div class="row" id="usersCards">
        <UserListCard v-for="user in users" class="userCard" @userUpdated="updated" :user="user" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .userCard {
      margin-bottom: 3vh;
  }

    @import "../../node_modules/bootstrap/scss/bootstrap";
  #usersCards {
    @include row-cols(1);
    @include media-breakpoint-up(md) {
      @include row-cols(2);
    }
    @include media-breakpoint-up(lg) {
      @include row-cols(3)
    }
  }
</style>