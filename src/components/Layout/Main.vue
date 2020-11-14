<template>
  <v-app>
    <AppBar />
    <v-main>
      
      <v-container fluid>
        <v-breadcrumbs :items="$route.meta.breadcrumb" divider="→" />
        <h2>{{this.$route.meta.title}}</h2>
        <router-view />
        <AppFooter />
      </v-container>

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
    padding-top: 86px !important;
  }
  .v-breadcrumbs {
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
  @media (max-width: 600px) {
    main.v-main {
      padding-top: 76px !important;
    }
  }
</style>