<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    HelloWorld,
    Header
  }
}
</script>

<style>
@import "assets/style.css";
#app{
  font-family: 'Montserrat', sans-serif;
}
</style>
