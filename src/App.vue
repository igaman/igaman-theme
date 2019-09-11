<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png">
    <br>
    <app-nav></app-nav>
    <br>
    <!-- <app-post></app-post> -->
    <router-view/>
  </div>
</template>

<script>
import post from './components/Post.vue';
import nav from './components/Nav.vue';

export default {
  name: 'app',
  components: {
    appPost: post,
    appNav: nav,
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
