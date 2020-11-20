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

        <v-snackbar v-model="snackbar.active" :color="snackbar.color" :timeout="snackbar.timeout">
          {{snackbar.text}}
          <v-btn text @click.stop="snackbar.active = false">Fechar</v-btn>
        </v-snackbar>
      </v-container>
    </v-card>
  </v-layout>
</template>
<script>
import MeusDadosForm from './MeusDadosForm.vue';
import {get, update} from '@/services/abstract.service';
export default {
  components: {MeusDadosForm},
  data: () => ({
    data: {},
    loading: false,
    errors: [],
    snackbar: {
      active: false,
      color: '',
      text: '',
      timeout: 5000,
    },
  }),
  computed: {
    userData() {
      return this.$store.state.user;
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
      const response = await get(`usuario/${this.userData.id_usuario}`);
      this.data = response.data.data;
    },
    async save() {
      this.loading = true;
      const response = await update(
        `usuario/${this.userData.id_usuario}`,
        this.data
      );

      this.loading = false;

      if (response.errors) {
        this.errors = response.errors;
        this.snackbar.text = response.message;
        this.snackbar.color = response.messageType;
        this.snackbar.active = true;
        return;
      }

      this.snackbar.text = response.data.message;
      this.snackbar.color = response.data.messageType;
      this.snackbar.active = true;
    },
  },
};
</script>