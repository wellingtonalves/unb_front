<template>
  <v-container>
    <card-default>
      <v-container class="pa-5" fluid>
        <usuario-form @update="update" :errors="errors">
          <template v-slot:buttons>
            <v-btn class="mr-4" @click="$router.push('/usuarios')">
              <v-icon class="mr-2">mdi-backup-restore</v-icon>
              Voltar
            </v-btn>

            <v-btn class="mr-4" color="primary" :loading="loading" @click="save()">
              <v-icon class="mr-2">mdi-content-save</v-icon>
              Salvar
            </v-btn>
          </template>
        </usuario-form>
      </v-container>
    </card-default>
  </v-container>
</template>

<script>
  import UsuarioForm from "./UsuarioForm";
  import {create} from "@/services/abstract.service";
  export default {
    name: "UsuarioCreate",
    components: {UsuarioForm},
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
        const response = await create('usuario', this.data);
        this.loading = false;
        
        if (response.errors) {
          this.errors = response.errors;
          return false;
        }
        this.$router.push('/usuarios');
      }
    }
  }
</script>

<style scoped>

</style>