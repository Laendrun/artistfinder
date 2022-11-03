<script setup>
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const getArtistData = async() => {
    let artistData = await fetch(`https://api.artistfinder.world/api/v1/artists/verified/${route.params.id}`, {
      method: 'GET',
    });
    let artistJson = await artistData.json();
    return artistJson[0];
  }

  const getReservationsData = async() => {
	let reservationsData = await fetch(`https://api.artistfinder.world/api/v1/reservations/artist/${route.params.id}`, {
		method: 'GET',
	});
	let reservationsJson = await reservationsData.json();
	return reservationsJson;
  }

  async function updated() {
	const dat = []
	dat[0] = await getArtistData();
	dat[1] = await getReservationsData();
	return dat;
  }

  function getLinkWithoutHttp(link) {
	if (link.includes('http://')) { link.replace('http://', '') }
	if (link.includes('https://')) { link.replace('https://', '') }
	return (link)
  }

  const data = await updated()
  let reservations = null;
  if (!data[1].status) {
	reservations = data[1]
  }
  const artist = data[0];

  let link = null;
  let linkWithoutHttp = null;

	if (artist.artist_website) {
		link = artist.artist_website.includes('https://') || artist.artist_website.includes('http://') ? artist.artist_website : `https://${artist.artist_website}`
		linkWithoutHttp = getLinkWithoutHttp(artist.artist_website)
	}

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
					<div class="row">
						<div class="col-md-6">
							<div class="row">
								<p>{{ artist.artist_name }}</p>
							</div>
							<div class="row" v-if="artist.artist_contact_phone">
								<p>{{ artist.artist_contact_phone }}</p>
							</div>
							<div class="row" v-if="artist.artist_contact_email">
								<p>{{ artist.artist_contact_email }}</p>
							</div>
							<div class="row" v-if="artist.artist_website">
								<p><a :href="`${link}`" target="_blank">{{ linkWithoutHttp }}</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row pt-2">
			<div class="card">
				<div class="card-title">Reservations</div>
				<div class="card-body">
					<div class="row">
						<div class="col-md-6" v-if="reservations">
							<div class="row" v-for="reservation in reservations">
								<p>{{ reservation.reservation_date }} - {{ reservation.reservation_time }}</p>
							</div>
						</div>
					</div>
				</div>
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