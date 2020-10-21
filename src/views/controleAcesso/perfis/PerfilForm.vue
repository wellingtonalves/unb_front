<template>
  <div>
    <v-form lazy-validation ref="form" v-model="validForm">
      <v-row>
        <v-col class="d-flex" cols="4" sm="6">
          <v-text-field
            v-model="dataResponse.tx_nome_perfil"
            :error-messages="errorData.tx_nome_perfil"
            :rules="rules.required"
            outlined
            label="Nome do Perfil"
            required />
        </v-col>
      </v-row>
      
      <v-row>
        
        <v-col>
          <v-card raised elevation="10">
            <v-card-title style="color: white; background-color: #283593; justify-content: center;">Permissões</v-card-title>
            <v-data-table
              v-model="selected"
              :headers="headersPermissoes"
              hide-default-header
              hide-default-footer
              :items="permissoes"
              disable-pagination
              item-key="id_permissao"
              sort-by="tx_nome_permissao"
              :search="searchPermissoes"
              :loading="loadingPermissoes"
              :show-select="true"
              no-results-text="Nenhum registro encontrado"
              no-data-text="Nenhum registro encontrado"
              height="250px"
              class="elevation-1">

              <template v-slot:top>
                <v-text-field
                  v-model="searchPermissoes"
                  append-icon="mdi-magnify"
                  label=""
                  single-line
                  hide-details/>
              </template>

            </v-data-table>
          </v-card>
        </v-col>

        <v-col>
          <v-col>

            <v-col>
              <v-btn small class="mr-2" color="indigo" outlined fab @click="selecionarPermissoes()">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-col>

            <v-col>
              <v-btn small class="mr-2" color="indigo" outlined fab @click="selecionarTodasPermissoes()">
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-btn>
            </v-col>

            <v-col>
              <v-btn small class="mr-2" color="indigo" outlined fab @click="removerPermissoes()">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-col>

            <v-col>
              <v-btn small class="mr-2" color="indigo" outlined fab @click="removerTodasPermissoes()">
                <v-icon>mdi-chevron-double-left</v-icon>
              </v-btn>
            </v-col>

          </v-col>
        </v-col>

        <v-col>
          <v-card raised elevation="10">

            <v-card-title style="color: white; background-color: #283593; justify-content: center;">Permissões selecionadas</v-card-title>
            <v-data-table
              v-model="selectedPermissoesSelecionada"
              :headers="headersAcaoSelecionada"
              hide-default-header
              hide-default-footer
              :items="dataResponse.permissao"
              disable-pagination
              item-key="id_permissao"
              sort-by="tx_nome_permissao"
              :show-select="true"
              :search="searchPermissoesSelecionada"
              no-results-text="Nenhum registro encontrado"
              no-data-text="Nenhum registro encontrado"
              height="250px"
              class="elevation-1">

              <template v-slot:top>
                <v-text-field
                  v-model="searchPermissoesSelecionada"
                  append-icon="mdi-magnify"
                  label=""
                  single-line/>
              </template>

            </v-data-table>
            
          </v-card>
        </v-col>
        
      </v-row>
      
      <v-row class="mt-5" justify="center">
        <slot name="buttons"></slot>
      </v-row>

    </v-form>
  </div>
</template>

<script>
  import {get} from "../../../services/abstract.service";

  export default {
    name: "PerfilForm",
    props: ['data', 'errors'],
    data: () => ({
      validForm: false,
      dataResponse: {
        permissao: []
      } || this.data,
      errorData: {},
      rules: {
        required: [v => !!v || 'Campo obrigatório'],
      },
      permissoes: [],
      selected: [],
      searchPermissoes: '',
      loadingPermissoes: false,
      headersPermissoes: [
        {text: 'Permissões', align: 'left', value: 'tx_nome_permissao'},
      ],
      selectedPermissoesSelecionada: [],
      searchPermissoesSelecionada: '',
      headersAcaoSelecionada: [
        {text: 'Permissões', align: 'left', value: 'tx_nome_permissao'},
      ],
    }),
    watch: {
      dataResponse: function (val) {
        this.$emit('update', val);
      },
      errors: function (val) {
        this.errorData = val;
      },
      data: function (val) {
        if (val.permissao) {
          val.permissao.map(obj => {
            this.permissoes.map((obj2, index) => {
              if (obj2.id_permissao == obj.id_permissao) {
                this.permissoes.splice(index, 1);
              }
            })
          });
        }
        
        this.dataResponse = val;
      },
    },
    async beforeMount() {
      await this.getPermissao();
    },
    methods: {
      async getPermissao() {
        const response = await get('/permissao?pagination=false');
        this.permissoes = response.data.data;
      },
      selecionarPermissoes() {
        this.selected.map(obj => {
          this.dataResponse.permissao.push(obj);

          this.permissoes.map((obj2, index) => {
            if(obj2.id_permissao == obj.id_permissao) {
              this.permissoes.splice(index, 1);
            }
          })
        });

        this.limparPermissoesSelecionadas();
      },
      selecionarTodasPermissoes() {
        this.permissoes.map(obj => {
          this.dataResponse.permissao.push(obj);
        });

        this.permissoes = [];
        this.limparPermissoesSelecionadas();
      },
      removerPermissoes() {
        this.selectedPermissoesSelecionada.map(obj => {
          this.permissoes.push(obj);

          this.dataResponse.permissao.map((obj2, index) => {
            if(obj2.id_permissao == obj.id_permissao) {
              this.dataResponse.permissao.splice(index, 1);
            }
          })
        });

        this.limparPermissoesSelecionadas();
      },
      removerTodasPermissoes() {
        this.dataResponse.permissao.map(obj => {
          this.permissoes.push(obj);
        });

        this.dataResponse.permissao = [];
        this.limparPermissoesSelecionadas();
      },
      limparPermissoesSelecionadas() {
        this.selected = [];
        this.selectedPermissoesSelecionada = [];
      },
    }
  }
</script>
