<script setup>
  const callback = (response) => {
    fetch('https://api.artistfinder.world/api/v1/auth/google', {
      method: "POST",
      body: JSON.stringify({
        token: response.credential
      }), 
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(data => {
      window.localStorage.setItem('Authorization', data.token);
    });
  }
</script>

<script>
export default {
  name: 'GoogleSignin',
}
</script>

<template>
  <GoogleLogin :callback="callback"/>
</template>