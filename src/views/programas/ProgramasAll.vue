<template>
  <v-container>
    <v-flex align-center justify-center>
      <v-layout column class="justify-center align-center">
        <v-row>
          
          <list-programas-cards
            v-if="programaData"
            :programa-data="programaData.data"
          />
          
        </v-row>
        <v-row>
          <h2 class="primary--text mt-16">
            Perguntas<br />
            Frequentes
          </h2>
          <list-perguntas type="programas"/>
        </v-row>
      </v-layout>
    </v-flex>
  </v-container>
</template>
<script>
import {get} from '@/services/abstract.service';
export default {
  data: () => ({
    programaData: {},
  }),
  created() {
    this.getAllProgramas();
  },
  methods: {
    async getAllProgramas() {
      const response = await get('/programas');
      this.programaData = response.data;
    },
  },
};
</script>
