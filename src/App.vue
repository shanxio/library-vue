<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/*基础样式 start*/
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
/*基础样式 end*/
</style>
