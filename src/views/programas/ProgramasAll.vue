<template>
  <v-row>
    <v-flex xs12 sm8 offset-sm2 align-center justify-center>
      <v-layout column class="justify-center align-center">
        <v-row>
          <v-layout class="cards course-cards flex-wrap justify-center">
            <list-programas-cards
              v-if="programaData"
              :programa-data="programaData.data"
            />
          </v-layout>
        </v-row>
        <v-row>
          <h2 class="primary--text mt-16">
            Perguntas<br />
            Frequentes
          </h2>
          <PerguntasFrequentes />
        </v-row>
      </v-layout>
    </v-flex>
  </v-row>
</template>
<script>
import {get} from '@/services/abstract.service';
import PerguntasFrequentes from '@/views/PerguntasFrequentes.vue';
export default {
  components: {PerguntasFrequentes},
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
