<template>
  <v-layout wrap>
    <card-default>
      <ofertas-form @update="update" :data="data" :errors="errors">
        <template v-slot:buttons>
          <v-btn class="mr-4" @click="$router.push('/ofertas')">
            <v-icon class="mr-2">mdi-backup-restore</v-icon>
            Voltar
          </v-btn>

          <v-btn class="mr-4" color="primary" :loading="loading" @click="save()">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Salvar
          </v-btn>
        </template>
      </ofertas-form>
    </card-default>
  </v-layout>
</template>

<script>
  import OfertasForm from "./OfertasForm";
  import {get, update} from "@/services/abstract.service";
  export default {
    name: "OfertasEdit",
    components: {OfertasForm},
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
        const response = await get(`ofertas/${this.$route.params.id}`);
        this.data = response.data.data;
      },
      update(data) {
        this.data = data;
      },
      async save() {
        this.loading = true;
        const response = await update(`ofertas/${this.$route.params.id}`, this.data)

        this.loading = false;

        if (response.errors) {
          this.errors = response.errors;
          return false
        }
        this.$router.push('/ofertas');
      }
    }
  }
</script>
