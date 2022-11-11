<script setup>
import { onMounted } from 'vue'

const props = defineProps({
	artist: {
		type: Object
	}
});

onMounted(() => {
	const messages = document.getElementById('messages');
	const contact_form = document.getElementById('contact_form');
	const input = document.getElementById('input');

	contact_form.addEventListener('submit', (e) => {
		e.preventDefault();
		if (input.value) {
			socket.emit('chat message', input.value);
			input.value = '';
		}
	});

	socket.on('chat message', (msg) => {
		const item = document.createElement('li');
		item.textContent = msg;
		messages.appendChild(item);
		window.scrollTo(0, document.body.scrollHeight);
	});
})

</script>

<template>
	<div class="container">
		<ul id="messages"></ul>
		<form id="contact_form" action="">
			<input id="input" autocomplete="off" /><button class="btn btn-primary">Envoyer</button>
		</form>
	</div>
</template>

<style scoped>
	#messages { max-height: 25vh; overflow-y: scroll; }
	#messages { list-style-type: none; margin: 0; padding: 0;}
	#messages > li { padding: 0.5rem 1rem; }
	#contact_form { background: rgba(0, 0, 0, 0.15); padding: 0.5rem; display: flex; }
	#input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
</style>