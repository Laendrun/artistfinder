<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(['userUpdated'])

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

async function updated() {
  const dat = await getData();
  return dat;
}

const data = await updated()
const role = data.role_id

onMounted(() => {
  document.title = 'Profile'
})
</script>

<script>
// @ is an alias to /src
import GeneralInformation from '@/components/user_profile/GeneralInformation.vue'
import UsefulInformation from '@/components/user_profile/UsefulInformation.vue'

export default {
  name: 'ProfileView',
  components: {
    GeneralInformation,
    UsefulInformation
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">
        <div class="row">
          <GeneralInformation id="gen-info" :data="data" @userUpdated="updated" />
        </div>
        <div class="row">
          <UsefulInformation id="use-info" />
        </div>
      </div>
      <div class="col-sm-1"></div>
    </div>
  </div>
</template>

<style scoped>
  #gen-info, #use-info {
    margin-bottom: 3vh
  }
</style>