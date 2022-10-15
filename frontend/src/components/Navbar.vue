<template>
<div class="navbarComp">
  <nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
    <RouterLink to="/" class="navbar-brand">Artistfinder</RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="mainNav">
      <RouterLink to="/signin" class="nav-link nav-router-link">Connexion</RouterLink>
      <RouterLink to="/about" class="nav-link nav-router-link">À propos</RouterLink>
      <RouterLink to="/test" class="nav-link nav-router-link">Test</RouterLink>
    </div>
  </nav>  
</div>

</template>

<style scoped>
  .navbarComp {
    display: block;
    margin-bottom: 10vh;
  }
  .nav-router-link {
    margin-left: 1vh;
    margin-right: 1vh;
  }
</style>

<script>

export default {
  name: 'Navbar',
}
</script>