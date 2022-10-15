<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'TestView',
  components: {
    Navbar,
  }
}
</script>

<template>
  <Navbar />
  <div class="about">
    <h1>This is a test page</h1>
  </div>
</template>