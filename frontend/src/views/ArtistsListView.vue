<script setup>
  import { onMounted } from 'vue'

  const getData = async() => {
    let userData = await fetch('https://api.artistfinder.world/api/v1/artists/verified', {
      method: 'GET',
    });
    let userJson = await userData.json();
    return userJson;
  }

  const artists = await getData()
  console.log(artists)

  onMounted(() => {
    document.title = 'Artistes'
  })
</script>

<script>
  import ArtistListCard from '@/components/artists/ArtistListCard.vue'
  export default {
    name: 'ArtistsView',
    components: {
      ArtistListCard
    }
  }
</script>

<template>
  <div class="artistsView">
    <div class="container">
      <div class="row">
        <ArtistListCard v-for="(artist, i) in artists" class="artistCard" :artist="artist" />
      </div>
        
    </div>
  </div>
</template>

<style scoped>
  .artistCard {
    margin-bottom: 3vh;
  }
</style>