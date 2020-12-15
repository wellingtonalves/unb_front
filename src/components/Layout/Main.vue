<template>
  <v-app>
    <AppBar />
    <v-main>

      <v-container v-if="isAuthenticated === true">
        <v-breadcrumbs :items="$route.meta.breadcrumb" divider="→" />
        <h2>{{this.$route.meta.title}}</h2>
      </v-container>
      
      <router-view />

      <v-container>
        <AppFooter />
      </v-container>

    </v-main>
    <snack-bar-component/>    
  </v-app>
</template>

<script>
  import AppBar from './AppBar';
  import AppFooter from './AppFooter';
  import {mapGetters} from "vuex";

  export default {
    name: 'Main',
    components: {AppFooter, AppBar},
    data: () => ({
      //
    }),
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
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
    padding-top: 110px !important;
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