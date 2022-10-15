<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Profile'
})
</script>

<script>
// @ is an alias to /src
import GeneralInformation from '@/components/user_profile/GeneralInformation.vue'

export default {
  name: 'ProfileView',
  components: {
    GeneralInformation
  }
}
</script>

<template>
  <div class="container">
    <Suspense>
      <!-- component with nested async dependencies -->
      <GeneralInformation />

      <!-- loading state via #fallback slot -->
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>