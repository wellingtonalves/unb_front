<template>
  <v-container>
    <v-card class="mx-auto" height="100%" width="100%" elevation="10">
      <v-container class="pa-5" fluid>
        <meus-dados-form @update="receiveData" ref="userForm" :user-data="data" :errors="errors">
          <template v-slot:buttons>
            <v-btn class="mr-4" color="primary" :loading="loading" @click="onSave()">
              <v-icon class="mr-2">mdi-content-save</v-icon> Salvar
            </v-btn>
          </template>
        </meus-dados-form>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import MeusDadosForm from './MeusDadosForm.vue';
import {get, update} from '@/services/abstract.service';
import {mapGetters} from "vuex";

export default {
  components: {MeusDadosForm},
  data: () => ({
    data: {},
    loading: false,
    errors: [],
  }),
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    receiveData(data) {
      this.data = data;
    },
    async getData() {
      await get(`usuario/${this.user.id_usuario}`).then(response => {
        this.data = response.data.data;
      });
    },
    onSave() {
      if (!this.$refs.userForm.formValid()) return;
      this.loading = true;
      return this.$refs.userForm.checkRoute() === 'alterar-senha'
        ? this.updatePassword()
        : this.save();
    },
    async save() {
      const response = await update(
        `usuario/${this.user.id_usuario}`,
        this.data
      );
      this.errorHandler(response);
    },
    async updatePassword() {
      const response = await update(
        `usuario/${this.user.id_usuario}/resetar-senha`,
        {tx_senha_usuario: this.data.tx_senha_usuario}
      );
      this.errorHandler(response);
    },
    errorHandler(response) {
      this.loading = false;
      if (response.errors) {
        this.errors = response.errors;
        return false;
      }
    },
  },
};
</script>