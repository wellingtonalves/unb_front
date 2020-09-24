<template>
  <v-app>
    <AppBar />
    <v-main>
      
      <v-container>
        <v-breadcrumbs :items="$route.meta.breadcrumb" divider="→" />
        <router-view />
      </v-container>

      <AppFooter />

    </v-main>
    
  </v-app>
</template>

<script>
  import AppBar from './AppBar';
  import AppFooter from './AppFooter';

  export default {
    name: 'Main',
    components: {AppFooter, AppBar},
    data: () => ({
      //
    }),
  };
</script>

<style>
  /* TODO Este código deve ser renderizado em todas as telas do ambiente */
  header.v-app-bar > .v-toolbar__content {
    height: auto !important; 
  }
</style>

<style scoped>
  header.v-app-bar {
    background-color: var(--v-white-base) !important;
    box-shadow: 0 0 10px 0 rgba(55,71,79,.1) !important;
    height: auto !important;
  }
  .v-toolbar__content {
    height: auto !important; 
  }
  main.v-main {
    background-color: var(--v-lightgrey-base);
    padding-top: 82px !important;
  }
  .v-breadcrumbs {
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
</style>