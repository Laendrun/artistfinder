<script>
export default {
    name: "HelloWorld",
    props: {
        title: String
    },
}
</script>

<template>
  <div class="hello">
    <h1>{{ title }}</h1>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
