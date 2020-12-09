<template>
  <v-container>
    <card-default>
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
      </v-container>
    </card-default>

  </v-container>
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
    }),
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
          return false;
        }
        this.$router.push('/cursos');
      }
    }
  }
</script>
