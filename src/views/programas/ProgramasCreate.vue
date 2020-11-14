<template>
  <v-layout wrap>
    <card-default>
      <programas-form @update="update" :errors="errors">
        <template v-slot:buttons>
          <v-btn class="mx-2" @click="$router.push('/programas')">
            <v-icon class="mr-2">mdi-backup-restore</v-icon>
            Voltar
          </v-btn>

          <v-btn class="mx-2" color="primary" :loading="loading" @click="save()">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Salvar
          </v-btn>
        </template>
      </programas-form>
    </card-default>
  </v-layout>
</template>

<script>
import ProgramasForm from "./ProgramasForm";
import {create} from "@/services/abstract.service";

export default {
  name: "ProgramasCreate",
  components: {ProgramasForm},
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
      const response = await create('programas', this.data)
      this.loading = false;
      if (response.errors) {
        this.errors = response.errors;
        return false
      }
      this.$router.push('/programas');
    }
  }
}
</script>
