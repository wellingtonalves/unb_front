<template>
  <v-layout wrap>
    <card-default>
      <ofertas-form @update="update" :errors="errors">
        <template v-slot:buttons>
          <v-btn class="mx-2" @click="$router.push('/ofertas')">
            <v-icon class="mr-2">mdi-backup-restore</v-icon>
            Voltar
          </v-btn>

          <v-btn class="mx-2" color="primary" :loading="loading" @click="save()">
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
import {create} from "@/services/abstract.service";

export default {
  name: "OfertasCreate",
  components: {OfertasForm},
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
      const response = await create('ofertas', this.data)
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
