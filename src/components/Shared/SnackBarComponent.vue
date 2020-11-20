<template>
  <v-snackbar id="snackbar-component" v-model="snackbar.active" :color="snackbar.color" :timeout="snackbar.timeout">
    {{snackbar.text}}
    <v-btn text @click.stop="snackbar.active = false">
      Fechar
    </v-btn>
  </v-snackbar>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "SnackComponent",
  computed: {
    ...mapGetters(['snackbar'])
  }
  
}
</script>

<style scoped>

</style>