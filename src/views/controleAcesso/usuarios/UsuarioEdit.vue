<template>
  <v-container>
    <card-default>
      <v-container class="pa-5" fluid>
        <usuario-form @update="update" :data="data" :errors="errors">
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
  import {get, update} from "@/services/abstract.service";
  export default {
    name: "UsuarioEdit",
    components: {UsuarioForm},
    data: () => ({
      data: '',
      loading: false,
      errors: [],
    }),
    async mounted() {
      await this.getData();
    },
    methods: {
      async getData() {
        const response = await get(`usuario/${this.$route.params.id}`);
        this.data = response.data.data;
      },
      update(data) {
        this.data = data;
      },
      async save() {
        this.loading = true;
        const response = await update(`usuario/${this.$route.params.id}`, this.data)
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