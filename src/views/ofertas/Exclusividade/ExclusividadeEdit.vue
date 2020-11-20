<template>
  <v-layout wrap>
    
    <h3 class="subheading">
      Oferta: 
      <strong>{{oferta.tx_nome_curso + " ( " + oferta.tx_nome_oferta + " )"}}</strong>
    </h3>

    <card-default>
      
      <exclusividade-form @update="update" :data="exclusividade" :errors="errors">
        <template v-slot:buttons>
          <v-btn class="mr-4" @click="$router.push(`/ofertas/${oferta.id_oferta}/gerenciar-exclusividade`)">
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
  import {get, update} from "@/services/abstract.service";
  export default {
    name: "ExclusividadeEdit",
    components: {ExclusividadeForm},
    data: () => ({
      loading: false,
      oferta: {},
      exclusividade: '',
      errors: [],
      snackbar: {
        active: false,
        color: '',
        text: '',
        timeout: 5000
      },
    }),
    watch: {},
    async mounted() {
      await this.getOferta();
      await this.getExclusividadeOferta();
    },
    methods: {
      async getOferta() {
        const response = await get(`ofertas/${this.$route.params.id}`);
        this.oferta = response.data.data;
      },
      async getExclusividadeOferta() {
        const response = await get(`exclusividade-oferta/${this.$route.params.id_exclusividade}`);
        this.exclusividade = response.data.data;
      },
      update(exclusividade) {
        this.exclusividade = exclusividade;
      },
      async save() {
        this.loading = true;
        const response = await update(`exclusividade-oferta/${this.exclusividade.id_exclusividade_oferta}`, this.exclusividade)
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
