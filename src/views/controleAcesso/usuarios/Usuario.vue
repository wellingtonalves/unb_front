<template>
  <v-layout wrap>
    
    <filter-expansion-panel @filtrar="filtrar" @resetar="limparFiltros()">
      <template v-slot:filterExpansionPanel>
        
        <v-col cols="12" sm="3">
          <v-text-field dense
                        v-model="filterData.tx_email_pessoa"
                        label="E-mail"
          />
        </v-col>

        <v-col cols="12" sm="3">
          <v-text-field dense
                        v-model="filterData.tx_nome_pessoa"
                        label="Nome"
          />
        </v-col>

        <v-col cols="12" sm="2">
          <v-select dense v-model="filterData.id_perfil" label="Perfil" :items="perfil" item-text="tx_nome_perfil" item-value="id_perfil" />
        </v-col>

        <v-col cols="12" sm="3">
          <v-text-field dense
                        v-model="filterData.nr_cpf"
                        label="CPF"
                        v-mask="'###.###.###-##'"
          />
        </v-col>
        
      </template>
    </filter-expansion-panel>

    <v-row class="flex-basis-100">
      <v-col cols="12">
        <v-card>

          <v-data-table
            :headers="headers"
            :items="data"
            :loading="loading"
            :server-items-length="pagination.total"
            :items-per-page="15"
            :options.sync="options"
            item-key="id_usuario"
            sort-by="tx_nome_pessoa"
            class="elevation-1"
            no-data-text="Nenhum registro encontrado."
            no-results-text="Nenhum registro encontrado."
            loading-text="Aguarde, estamos carregando os dados.">

            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Listagem de Usuários</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn color="primary" dark outlined rounded @click="$router.push('/usuario/create')">
                  <v-icon>mdi-plus</v-icon>
                  Novo
                </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.pessoa.nr_cpf="{ item }">
              <td v-if="item.pessoa.nr_cpf">{{item.pessoa.nr_cpf | maskCpfCnpj}}</td>
            </template>
            
            <template v-slot:item.action="{ item }">

              <v-layout wrap class="action-buttons">

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn small tile outlined icon color="primary" @click="$router.push(`/usuario/${item.id_usuario}/edit`)" v-on="on">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Editar</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn small tile outlined icon color="error" @click="excluir(item)" v-on="on">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Excluir</span>
                </v-tooltip>

              </v-layout>

            </template>
            
          </v-data-table>

        </v-card>
      </v-col>
    </v-row>

    <dialog-delete-component :text="dialogDeleteData.pessoa.tx_nome_pessoa" v-model="dialogDelete" @excluir="excluirItem(dialogDeleteData.id_usuario)" />

  </v-layout>
</template>

<script>
  import inputMask from '@/filters';
  import {mask} from 'vue-the-mask';
  import {get} from "@/services/abstract.service";
  import {remove} from "../../../services/abstract.service";
  import removeMask from "../../../helpers/removeMask";

  export default {
    name: "Usuario",
    directives: {mask},
    mixins: [inputMask],
    data: () => ({
      expanded: [],
      filterData: {},
      perfil: [],
      data:  [],
      pagination: {},
      options: {},
      headers: [
        {text: 'id', value: 'id_usuario'},
        {text: 'Nome', value: 'pessoa.tx_nome_pessoa', align: 'start'},
        {text: 'CPF', value: 'pessoa.nr_cpf', align: 'center'},
        {text: 'E-mail', value: 'pessoa.tx_email_pessoa', align: 'start'},
        {text: 'Perfil', value: 'perfil.tx_nome_perfil', align: 'start'},
        {text: 'Situação', value: 'situacao_usuario.tx_nome_situacao_usuario', align: 'start'},
        {text: 'Ações', value: 'action', sortable: false},
      ],
      loading: false,
      dialogDelete: false,
      dialogDeleteData: {
        pessoa: {}
      }
    }),
    mounted() {
      this.get();
      this.getPerfil();
    },
    watch: {
      options: {
        handler (val) {
          if (val.itemsPerPage == '-1') {
            this.get(`?pagination=false`);
            return 
          }
          
          this.get(`?per_page=${val.itemsPerPage}&page=${val.page}`);
        },
        deep: true,
      },
    },
    methods: {
      async get(filter = '') {
        this.loading = true;
        const response = await get('/usuario' + filter);
        this.pagination = response.data;
        this.data = response.data.data;
        this.loading = false;
      },
      async getPerfil() {
        const responsePerfil = await get('/perfil');
        this.perfil = responsePerfil.data.data;
      },
      /**
       * TODO - criar uma função dinamica para filtrar objetos com 2 níveis
       * exemplo, esta na entidade usuario e preciso filtrar a entidade pessoa.
       * @returns {Promise<void>}
       */
      async filtrar() {
        const removedMask = await removeMask(this.filterData);
        const filters = JSON.stringify(removedMask)
          .replace(/"/g, '')
          .replace('{', '')
          .replace('}', '')
          .replace('}', '')
          .replace('tx_email_pessoa', 'pessoa.tx_email_pessoa')
          .replace('tx_nome_pessoa', 'pessoa.tx_nome_pessoa')
          .replace('nr_cpf', 'pessoa.nr_cpf')
          .replace(/,/g, ';');
        
        await this.get('?search=' + filters + '&searchJoin=and');
      },
      limparFiltros() {
        this.filterData = {};
        this.get();
      },
      excluir(item) {
        this.dialogDeleteData = item;
        this.dialogDelete = true;
      },
      async excluirItem(id) {
        await remove(`/usuario/${id}`);
        this.dialogDelete = false;
        await this.get();
      }
    }
  }
</script>
