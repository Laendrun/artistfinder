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
      <div class="row" id="artistsCards">
        <ArtistListCard v-for="(artist, i) in artists" class="artistCard" :artist="artist" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .artistCard {
      margin-bottom: 3vh;
  }

    @import "../../node_modules/bootstrap/scss/bootstrap";
  #artistsCards {
    @include row-cols(1);
    @include media-breakpoint-up(md) {
      @include row-cols(2);
    }
    @include media-breakpoint-up(lg) {
      @include row-cols(3)
    }
  }
</style>