<template>
  <v-app>
    <AppBar />
    <v-content>
    </v-content>

    <AppFooter />
  </v-app>
</template>

<script>

import AppBar from "./components/Layout/AppBar";
import AppFooter from "./components/Layout/AppFooter";
export default {
  name: 'App',
  components: {AppFooter, AppBar},
  data: () => ({
    //
  }),
};
</script>
