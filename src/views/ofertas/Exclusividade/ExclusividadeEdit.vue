<template>
  <v-layout wrap>
    <card-default>
      
      <h3>
        Oferta: 
        {{oferta.tx_nome_curso + " ( " + oferta.tx_nome_oferta + " )"}}
      </h3>
      
      <exclusividade-form @update="update" :data="exclusividade" :errors="errors">
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

      <v-snackbar v-model="snackbar.active" :color="snackbar.color" :timeout="snackbar.timeout">
        {{snackbar.text}}
        <v-btn text @click.stop="snackbar.active = false">
          Fechar
        </v-btn>
      </v-snackbar>
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
    watch: {
      'snackbar.active': function (val) {
        if (this.snackbar.color == 'success' && val == false) {
          this.$router.push('/ofertas');
        }
      }
    },
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
        console.log('exclusividade')
        console.log(response)
        this.exclusividade = response.data.data;
      },
      update(exclusividade) {
        this.exclusividade = exclusividade;
      },
      async save() {
        this.loading = true;
        console.log('editar - form');
        console.log(this.exclusividade);
        const response = await update(`exclusividade-oferta/${this.exclusividade.id_exclusividade_oferta}`, this.exclusividade)

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
