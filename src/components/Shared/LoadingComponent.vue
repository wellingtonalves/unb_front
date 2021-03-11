<template>
  <div id="loading" v-if="loading">
    <v-progress-circular
      :size="150"
      color="#37474F"
      :indeterminate="loading"
    ></v-progress-circular>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "LoadingComponent",
  computed: {
    ...mapGetters(['loading'])
  },
}
</script>

<style scoped>
#loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image:  url(../../assets/logo.svg);
  background-color: white;
  background-size: 100px;
  background-position: center center;
}
</style>