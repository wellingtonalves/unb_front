<template>
  <v-layout wrap>
    <card-default>
      
      <h3 class="subheading">
        Oferta: <strong>{{oferta.tx_nome_curso + " ( " + oferta.tx_nome_oferta + " )"}}</strong>
      </h3>
      
      <exclusividade-form @update="update" :data="data" :errors="errors">
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
      </exclusividade-form>
      
    </card-default>
  </v-layout>
</template>

<script>
  import ExclusividadeForm from "./ExclusividadeForm";
  import {get, create} from "@/services/abstract.service";
  export default {
    name: "Exclusividade",
    components: {ExclusividadeForm},
    data: () => ({
      data: '',
      loading: false,
      oferta: {},
      errors: [],
    }),
    watch: {},
    async mounted() {
      await this.getOferta();
    },
    methods: {
      async getOferta() {
        const response = await get(`ofertas/${this.$route.params.id}`);
        this.oferta = response.data.data;
      },
      update(data) {
        this.data = data;
      },
      async save() {
        this.loading = true;
        this.data.id_oferta = this.$route.params.id;
        const response = await create(`exclusividade-oferta`, this.data)
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
