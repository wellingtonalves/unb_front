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
          <v-btn outlined color="error" v-show="permission('EXCLUSIVIDADE_EXCLUIR')" 
                 @click="excluir()">
            Remover exclusividade
          </v-btn>
        </v-col>
        
      </v-row>


      <v-row class="flex-basis-100">
        <v-col cols="12">
          <v-card>

            <v-data-table
              :headers="headersValorExclusividade"
              :items="valorExclusividade"
              :loading="loading"
              item-key="id_valor_exclusividade_oferta"
              sort-by="valor_exclusividade"
              class="elevation-1"
              no-data-text="Nenhum registro encontrado."
              no-results-text="Nenhum registro encontrado."
              loading-text="Aguarde, estamos carregando os dados.">

              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Listagem de Valores para exclusividade da oferta.</v-toolbar-title>
                </v-toolbar>
              </template>

              <template v-slot:item.action="{ item }">

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn v-show="permission('OFERTA_EXCLUIR')" small color="error" icon @click="excluir(item)"
                           v-on="on">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Excluir</span>
                </v-tooltip>

              </template>

            </v-data-table>

          </v-card>
        </v-col>
      </v-row>
      
      
      
      <v-row>
        <v-btn class="mr-4" @click="$router.push('/ofertas')">
          <v-icon class="mr-2">mdi-backup-restore</v-icon>
          Voltar
        </v-btn>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="dialogDelete" persistent max-width="500">
          <v-card>
            <v-card-title class="headline">Atenção!</v-card-title>
            <v-card-text>Deseja remover a exclusividade desta oferta ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="dialogDelete = false">Cancelar</v-btn>
              <v-btn color="primary" text @click="excluirItem(oferta.exclusividade.id_exclusividade_oferta)">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
  import {get, create, remove} from "@/services/abstract.service";
  import {checkPermission} from "@/helpers/checkPermission";
  export default {
    name: "Exclusividade",
    data: () => ({
      data: [],
      loading: false,
      oferta: {},
      valorExclusividade: [],
      headersValorExclusividade: [
        {text: 'ID', value: 'id_valor_exclusividade_oferta'},
        {text: 'Valor', value: 'valor_exclusividade'},
        {text: 'Ações', value: 'action', sortable: false},
      ],
      errors: [],
      dialogDelete: false,
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
        this.valorExclusividade = response.data.data.exclusividade.valor_exclusividade;
        console.log(this.valorExclusividade)
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
      },
      excluir() {
        this.dialogDelete = true;
      },
      async excluirItem(id) {
        const response = await remove(`/exclusividade-oferta/${id}`);
        this.dialogDelete = false;

        this.snackbar.text = response.message;
        this.snackbar.color = response.messageType;
        this.snackbar.active = true;
      }
    }
  }
</script>
