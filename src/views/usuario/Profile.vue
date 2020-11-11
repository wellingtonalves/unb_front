<template>
  <v-layout wrap>
    <v-card class="mx-auto" height="100%" width="100%" elevation="10">
      <v-container class="pa-5" fluid>
        <usuario-form
          @update="update"
          :user-data="userData"
          :errors="errors"
          :view="1"
        >
          <template v-slot:buttons>
            <v-btn class="mr-4" @click="$router.push('/usuarios')">
              <v-icon class="mr-2">mdi-backup-restore</v-icon>Voltar
            </v-btn>

            <v-btn class="mr-4" color="primary" :loading="loading" @click="save()">
              <v-icon class="mr-2">mdi-content-save</v-icon>Salvar
            </v-btn>
          </template>
        </usuario-form>

        <v-snackbar v-model="snackbar.active" :color="snackbar.color" :timeout="snackbar.timeout">
          {{snackbar.text}}
          <v-btn text @click.stop="snackbar.active = false">Fechar</v-btn>
        </v-snackbar>
      </v-container>
    </v-card>
  </v-layout>
</template>
<script>
import UsuarioForm from '../controleAcesso/usuarios/UsuarioForm';
import {update} from '@/services/abstract.service';
export default {
  components: {UsuarioForm},
  data: () => ({
    loading: false,
    errors: [],
    snackbar: {
      active: false,
      color: '',
      text: '',
      timeout: 5000,
    },
  }),
  mounted() {
      console.log('.user', this.$store.state.user)
  },
  computed: {
    userData() {
      return this.$store.state.user;
    },
  },
  watch: {
    'snackbar.active': function(val) {
      if (this.snackbar.color == 'success' && val == false) {
        this.$router.push('/usuarios');
      }
    },
  },
  methods: {
    update(data) {
      this.data = data;
    },
    async save() {
      this.loading = true;
      const response = await update(
        `usuario/${this.$route.params.id}`,
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