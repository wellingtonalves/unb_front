<template>
  <v-app>
    <AppBar />
    <v-content>
      <router-view />
    </v-content>

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
