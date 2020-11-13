<template>
  <v-layout wrap>
    <card-default>
      
      <h3>
        Oferta: 
        {{oferta.tx_nome_curso + " ( " + oferta.tx_nome_oferta + " )"}}
      </h3>
      
      <v-row>
        <v-col>
          <v-btn outlined color="primary">
            Adicionar Regra
          </v-btn>
        </v-col>

        <v-col>
          <v-btn outlined color="accent" v-show="permission('EXCLUSIVIDADE_EDITAR')" 
                 @click="$router.push(`/ofertas/${oferta.id_oferta}/exclusividade/${oferta.exclusividade.id_exclusividade_oferta}/edit`)">
            Editar
          </v-btn>
        </v-col>

        <v-col>
          <v-btn outlined color="error" v-show="permission('EXCLUSIVIDADE_EXCLUIR')">
            Remover exclusividade
          </v-btn>
        </v-col>
        
      </v-row>
      
      <v-row>
        <v-btn class="mr-4" @click="$router.push('/ofertas')">
          <v-icon class="mr-2">mdi-backup-restore</v-icon>
          Voltar
        </v-btn>
      </v-row>

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
  import {get, create} from "@/services/abstract.service";
  import {checkPermission} from "@/helpers/checkPermission";
  export default {
    name: "Exclusividade",
    data: () => ({
      data: [],
      loading: false,
      oferta: {},
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
    },
    methods: {
      permission(rule) {
        return checkPermission(rule);
      },
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
