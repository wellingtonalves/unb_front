<template>
  <v-container>
    <v-layout text-center wrap>
      <v-card class="mx-auto" height="100%" width="100%" elevation="10">
        <v-container class="pa-5" fluid>
          <curso-form @update="update" :errors="errors">
            <template v-slot:buttons>
              <v-btn class="mr-4" @click="$router.push('/cursos')">
                <v-icon style="padding-right: 10px">mdi-backup-restore</v-icon>
                Voltar
              </v-btn>

              <v-btn class="mr-4" color="primary" @click="save()" type="submit" :loading="loading">
                <v-icon class="mr-4">mdi-content-save</v-icon>
                Salvar
              </v-btn>
            </template>
          </curso-form>
          
          <v-snackbar v-model="snackbar.active" :color="snackbar.color" :timeout="snackbar.timeout">
            {{snackbar.text}}
            <v-btn text @click.stop="snackbar.active = false">
              Fechar
            </v-btn>
          </v-snackbar>
        </v-container>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import CursoForm from "./CursoForm";
  export default {
    name: "CursoCreate",
    components: {CursoForm},
    data: () => ({
      data: '',
      loading: false,
      errors: [],
      snackbar: {
        active: false,
        color: '',
        text: '',
        timeout: 5000
      },
    }),
    mounted() {
      // this.getAll();
    },
    watch: {},
    methods: {
      update(data) {
        this.data = data;
      },
    }
  }
</script>

<style scoped>

</style>