<template>
  <v-layout wrap>

    <v-card width="100%" elevation="10">
      <v-container class="pa-5" fluid>
        <curso-form @update="update" :errors="errors">
          <template v-slot:buttons>
            <v-btn class="mx-2" @click="$router.push('/cursos')">
              <v-icon class="mr-2">mdi-backup-restore</v-icon>
              Voltar
            </v-btn>

            <v-btn class="mx-2" color="primary" :loading="loading" @click="save()">
              <v-icon class="mr-2">mdi-content-save</v-icon>
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
</template>

<script>
  import CursoForm from "./CursoForm";
  import {create} from "@/services/abstract.service";
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
    watch: {
      'snackbar.active': function (val) {
        if (this.snackbar.color == 'success' && val == false) {
          this.$router.push('/cursos');
        }
      }
    },
    methods: {
      update(data) {
        this.data = data;
      },
      async save() {
        this.loading = true;
        const response = await create('curso', this.data)

        this.loading = false;
        
        if (response.errors) {
          this.errors = response.errors;
          this.snackbar.text = response.message;
          this.snackbar.color = response.messageType;
          this.snackbar.active = true;
          return ;
        }

        this.snackbar.text = response.data.message;
        this.snackbar.color = response.data.messageType;
        this.snackbar.active = true;
      }
    }
  }
</script>
