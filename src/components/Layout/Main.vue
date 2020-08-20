<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-breadcrumbs :items="$route.meta.breadcrumb" divider="-" />
      <router-view />
    </v-main>

    <AppFooter />
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
  }
  main.v-main {
    background-color: var(--v-lightgrey-base);
  }
</style>