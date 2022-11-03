<script setup>
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const getData = async() => {
    let artistData = await fetch(`https://api.artistfinder.world/api/v1/artists/verified/${route.params.id}`, {
      method: 'GET',
    });
    let artistJson = await artistData.json();
    return artistJson;
  }

  async function updated() {
    const dat = await getData();
    return dat;
  }

  const data = await updated()
  console.log(data[0])
  const artist = data[0];

  onMounted(() => {
    document.title = `Fiche artiste - ${artist.artist_name}`
  })
</script>

<template>
  <div class="container">
    <div class="row pt-2">
      <div class="card">
        <div class="card-title">ArtistDetails</div>
        <div class="card-body">
          <div class="col">
            <div class="row">{{ artist.artist_name }}</div>
            <div class="row"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-2">
      <div class="card">
        <div class="card-title">Reservations</div>
      </div>
    </div>
    <div class="row pt-2">
      <div class="card">
        <div class="card-title">Availability</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>