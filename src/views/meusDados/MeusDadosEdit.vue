<template>
  <v-layout wrap>
    <v-card class="mx-auto" height="100%" width="100%" elevation="10">
      <v-container class="pa-5" fluid>
        <meus-dados-form @update="receiveData" :user-data="userData" :errors="errors">
          <template v-slot:buttons>
            <v-btn class="mr-4" color="primary" :loading="loading" @click="save()">
              <v-icon class="mr-2">mdi-content-save</v-icon>Alterar Dados
            </v-btn>
          </template>
        </meus-dados-form>
      </v-container>
    </v-card>
  </v-layout>
</template>
<script>
import MeusDadosForm from './MeusDadosForm.vue';
import {get, update} from '@/services/abstract.service';
import {userData} from "../../helpers/getUserData";
export default {
  components: {MeusDadosForm},
  data: () => ({
    data: {},
    loading: false,
    errors: [],
  }),
  computed: {
    userData() {
      return userData();
    },
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    receiveData(data) {
      this.data = data;
    },
    async getData() {
      await get(`usuario/${this.userData.id_usuario}`).then(response => {
        this.data = response.data.data;
      });
    },
    async save() {
      this.loading = true;
      const response = await update(`usuario/${this.userData.id_usuario}`, this.data);
      this.loading = false;

      if (response.errors) {
        this.errors = response.errors;
        return false;
      }
    },
  },
};
</script>