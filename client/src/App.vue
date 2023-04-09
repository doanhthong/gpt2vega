<template>
  <h1 class="text-4xl font-bold text-blue-500">GPT2VegaChart!</h1>
  <MainComponent />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import MainComponent from './components/MainComponent.vue';
import MainComponent from './components/MainComponent.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    MainComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
