<script setup>
	import { onMounted, ref } from 'vue'
	import NewChatRoomModal from '@/components/chat/NewChatRoomModal.vue';

	const user_id = localStorage.getItem('user_id');
	const authHeader = `Bearer ${localStorage.getItem('Authorization')}`;
	const chatSelected = ref(false);

	const socket_join = async (room_name) => {
		const messages = document.getElementById('messages');
		while( messages.firstChild ){
			messages.removeChild( messages.firstChild );
		}
		await get_messages_data(room_name.split(':')[1])
		const room_id_span = document.getElementById('room_id');
		write_messages(room_name);
		room_id_span.innerText = room_name;
		chatSelected.value = true;
		socket.emit('join room', room_name);
	}

	const send_in_room = () => {
		const message_form = document.getElementById('message_form');
		const message_input = document.getElementById('message_input');
		const room_id_span = document.getElementById('room_id');
		if (message_input.value) {
				const room_id = room_id_span.innerText;
				const msg = {
					msg: message_input.value,
					sender: localStorage.getItem('user_id'),
					room: room_id
				}
				socket.emit('room_msg', msg, room_id);
				message_input.value = '';
			}
	}

	socket.on('chat message', (msg) => {
		const messages = document.getElementById('messages');
		const item = document.createElement('li');
		item.textContent = msg.msg;
		if (msg.sender == user_id)
			item.classList.add('right')
		else
			item.classList.add('left');
		messages.appendChild(item);
		messages.scrollTo(0, messages.scrollHeight);
	});

	socket.on('test', () => {
		console.log('test');
	});

	const write_messages = (room_name) => {
		const saved_messages = JSON.parse(localStorage.getItem(room_name));
		const messages = document.getElementById('messages');
		saved_messages.forEach(message => {
			const item = document.createElement('li');
			item.textContent = message.message_content;
			if (message.message_sender == user_id)
				item.classList.add('right');
			else
				item.classList.add('left');
			messages.appendChild(item);
			messages.scrollTo(0, messages.scrollHeight);
		})
	} 

	const get_rooms_data = async () => {
		const roomsData = await fetch('https://api.artistfinder.world/api/v1/rooms/user', {
			method: 'GET',
			headers: {
			'Authorization': authHeader,
			}
		})
		const roomsJSON = await roomsData.json();
		return roomsJSON.rooms;
	}

	const get_messages_data = async (room_id) => {
		const messagesData = await fetch(`https://api.artistfinder.world/api/v1/messages/rooms/${room_id}`, {
			method: 'GET',
			headers: {
				'Authorization': authHeader
			}
		})
		const messagesJSON = await messagesData.json();
		localStorage.setItem(`room:${room_id}`, JSON.stringify(messagesJSON.messages));
	}

	const get_rooms = async () => {
		const rooms_data = await get_rooms_data()
		rooms_data.forEach(room => get_messages_data(room.rooms_id))
		return rooms_data
	}

	const save_room = async () => {
		const rooms_user_1 = localStorage.getItem('a');
		const rooms_user_2 = localStorage.getItem('user_id');
		const now = new Date();
		let da = now.getDate();
		da = da.toString().length == 1 ? '0' + da : da;
		const rooms_created = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + da;

		const newRoomData = await fetch(`https://api.artistfinder.world/api/v1/rooms/`,{
			method: 'POST',
			headers: {
				'Authorization': authHeader,
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				rooms_user_1: rooms_user_1,
				rooms_user_2: rooms_user_2,
				rooms_created: rooms_created
			})
		});
		console.log(await newRoomData.json())
		window.location.reload()
	}

	const rooms = await get_rooms();

	onMounted( () => {
		document.title = 'Chat';
	})
</script>

<template>
	<div class="container">
		<h1>Chat</h1>
		<div class="row">
			<div class="col-sm-2 myCol">
				<!-- user li -->
				<ul id="users">
					<li id="li_new" data-bs-toggle="modal" data-bs-target="#new_chat_room_modal">
						<b>+Nouveau</b>
					</li>
					<li v-for="room in rooms" @click="socket_join(`room:${room.rooms_id}`)">
						{{ room.rooms_user_1 == user_id ? room.room_user_2_username : room.room_user_1_username }}
					</li>
				</ul>
			</div>
			<div class="col-sm-10 myCol">
				<!-- chat window -->
				<ul id="messages"></ul>
				<form id="message_form" v-on:submit.prevent="send_in_room">
					<span id="room_id" hidden></span>
					<template v-if="chatSelected">
						<input autocomplete="off" id="message_input" /><button class="btn btn-small btn-primary">Envoyer</button>
					</template>
				</form>
			</div>
		</div>
		<NewChatRoomModal id="new_chat_room_modal" @new_room="save_room" />
	</div>
</template>

<style>
	#users > li { list-style-type: none; margin: 0; padding: 0; }
	#message_form { padding: 0.5rem; display: flex; position: relative; bottom: 0; }
	#message_input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
	#messages { min-height: 90%; max-height: 90%; overflow-y: scroll; list-style-type: none; margin: 0 !important; padding: 0 !important; }
	#messages > li.left { padding: 0.5rem 1rem; text-align: left; }
	#messages > li.right { padding: 0.5rem 1rem; text-align: right; }
	.myCol { background-color: rgba(0,0,0,0.05); border: solid; height: 70vh;}

</style>