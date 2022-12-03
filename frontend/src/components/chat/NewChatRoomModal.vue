<script setup>
	import { ref } from 'vue'

	const emits = defineEmits(['new_room']);

	const props = defineProps({
		id: {
			type: String
		}
	})

	const authHeader = `Bearer ${localStorage.getItem('Authorization')}`

	const search_user = async () => {
		const d1 = document.getElementById('d1').value;
		let url = null;

		if (d1){
			url = `https://api.artistfinder.world/api/v1/users/${d1}/10`
		}else{
			url = `https://api.artistfinder.world/api/v1/users/usernames/10`
		}
		let usernamesData = null;
		usernamesData = await fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': authHeader
			}
		})

		const usernameJSON = await usernamesData.json()
		const usernamesUL = document.getElementById('usernamesUL');		
		while( usernamesUL.firstChild ){
			usernamesUL.removeChild( usernamesUL.firstChild );
		}
		for (let i = 0; i < usernameJSON.count; i++) {
			const li = document.createElement('li');
			li.setAttribute('id', usernameJSON.usernames[i].user_id);
			li.classList.add('username');
			li.innerText = usernameJSON.usernames[i].user_username;
			li.addEventListener('click', (event) => {
				localStorage.setItem('a', event.target.id);
				emits('new_room')
			})
			usernamesUL.appendChild(li);
		}
	}

</script>

<template>
	<!-- Modal -->
	<div class="modal fade" :id="id" tabindex="-1" aria-labelledby="editInfosLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="editInfosLabel">Nouveau chat</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
				</div>
				<div class="modal-body">
					<div class="row justify-content-center">
						<div id="modalerror"></div>
						<div id="modalsuccess"></div>
						<form @submit.prevent="search_user" class="col-md-6 col-sm-10">
							<!-- Username / Artist Name input -->
							<div class="form-outline mb-4">
								<input type="text" id="d1" class="form-control" />
								<label class="form-label" for="d1">Nom d'utilisateur</label>
							</div>
						</form>
					</div>
					<div class="row justify-content-center">
						<ul id="usernamesUL"></ul>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn" data-bs-dismiss="modal">Annuler</button>
					<button @click="search_user" type="button" class="btn">Rechercher</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	#usernamesUL { list-style-type: none; }
</style>