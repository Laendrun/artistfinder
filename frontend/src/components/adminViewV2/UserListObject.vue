<script setup>
  import { reactive } from 'vue'
  import modifyUserModal from '@/components/adminViewV2/modal/modifyUserModal.vue'

  const emits = defineEmits(['updated']);
  const props = defineProps({
    user_prop: {
      type: Object,
    }
  })

  const user = props.user_prop
  const user_obj = reactive(user)

</script>

<template>
  <tr>
    <td>{{ user_obj.user_username }}</td>
    <td>{{ user_obj.user_fname}} {{ user_obj.user_lname }}</td>
    <td>{{ user_obj.user_email }}</td>
    <td v-if="user_obj.role_id==9">Admin</td>
    <td v-else>Utilisateur</td>
    <td>
      <button class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#modifyUserModal_'+user_obj.user_id">
        <font-awesome-icon icon="fa-solid fa-pen" />
      </button>
    </td>
    <modifyUserModal :user="user_obj" @updated="emits('updated')" />
  </tr>
</template>

<style scoped></style>