<template>
  <div id="app" class="container-fluid">
    <Header/>
      <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";


    export default {
    name: 'Myheader',
    components: {
        Header
    }
};
</script>

<style>
    #app {
        padding: 0px;
    }
</style>

