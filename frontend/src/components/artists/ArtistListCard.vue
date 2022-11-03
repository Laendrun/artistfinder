<script>
  export default {
    name: 'ArtistListCard',
    props: {
      artist: Object
    }
  }
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-1"></div>
        <div class="col-sm-10">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ artist.artist_name }}</h5>
              <p v-if="artist.artist_isGroup" class="card-text">Groupe: Oui</p>
              <p v-else class="card-text">Groupe: Non</p>
              <p class="card-text">Style: {{ artist.style_name }}</p>
              <p class="card-text">Type: {{ artist.type_name }}</p>
              <RouterLink :to="`/artists/${artist.artist_id}`" class="text-primary" >
                Plus de détails 
                <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
              </RouterLink>
            </div>
          </div>
        </div>
      <div class="col-sm-1"></div>
    </div>
  </div>
</template>