<script setup>
  const year = new Date().getFullYear();
</script>

<script>
export default {
  name: 'Footer'
}
</script>

<template>
  <div class="footerComp">
    <div class="container">
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
          <span class="text-muted">&copy; {{ year }} Artistfinder | Laendrun</span>
        </div>

        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li class="ms-3"><a class="text-muted" href="https://github.com/Laendrun/artistfinder" target="_blank"><font-awesome-icon icon="fa-brands fa-github" /></a></li>
          <li class="ms-3"><a class="text-muted" href="https://instagram.com/laendrun" target="_blank"><font-awesome-icon icon="fa-brands fa-instagram" /></a></li>
          <li class="ms-3"><a class="text-muted" href="#"></a></li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<style scoped>
</style>