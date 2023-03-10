<template>
  <v-container>

    <filter-expansion-panel @filtrar="filtrar" @resetar="limparFiltros()">

      <template v-slot:filterExpansionPanel>
        
        <v-col cols="12" sm="2">
          <v-select dense v-model="filterData.tp_situacao_curso" label="Status" :items="statusCurso" item-text="label" item-value="value" />
        </v-col>

        <v-col cols="12" sm="2">
          <v-select dense v-model="filterData.tp_origem_curso" label="Origem" :items="tpOrigemCurso" item-text="label" item-value="value" />
        </v-col>

        <v-col cols="12" sm="3">
          <v-text-field dense
                        v-model="filterData.tx_nome_curso"
                        label="Nome"
                        placeholder="Informe o nome do curso"
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
            :single-expand="true"
            :expanded.sync="expanded"
            show-expand
            item-key="id_curso"
            sort-by="tx_nome_curso"
            class="elevation-1"
            no-data-text="Nenhum registro encontrado."
            no-results-text="Nenhum registro encontrado."
            loading-text="Aguarde, estamos carregando os dados.">

            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Listagem de Cursos</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn color="primary" dark outlined rounded @click="$router.push('/curso/create')">
                  <v-icon>mdi-plus</v-icon>
                  Novo
                </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.tp_situacao_curso="{ item }">
              <span v-if="item.tp_situacao_curso == 'A'">Ativo</span>
              <span v-else>Inativo</span>
            </template>

            <template v-slot:item.action="{ item }">

              <v-layout wrap class="action-buttons">

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn small tile outlined icon color="primary" @click="$router.push(`/curso/${item.id_curso}/edit`)" v-on="on">
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

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <h4 class="mt-4">Conte??do Program??tico:</h4>
                <div class="mb-4" v-html="item.tx_conteudo_programatico"></div>
              </td>
            </template>
            
          </v-data-table>

        </v-card>
      </v-col>
    </v-row>

    <dialog-delete-component :text="dialogDeleteData.tx_nome_curso" v-model="dialogDelete" @excluir="excluirItem(dialogDeleteData.id_curso)" />

  </v-container>
</template>

<script>
  import {get} from "@/services/abstract.service";
  import {filterFormat} from "@/helpers/filterFormat";
  import {remove} from "../../services/abstract.service";

  export default {
    name: "Curso",
    data: () => ({
      expanded: [],
      filterData: {},
      statusCurso: [
        {
          label: 'ATIVO',
          value: 'A'
        },
        {
          label: 'INATIVO',
          value: 'I'
        },
      ],
      tpOrigemCurso: [
        'MIGRADO',
        'ENAP'
      ],
      data:  [],
      pagination: {},
      options: {},
      headers: [
        {text: 'Curso', value: 'tx_nome_curso', align: 'start',},
        {text: 'Carga Horaria Minima', value: 'qt_carga_horaria_minima', align: 'center',},
        {text: 'Status', value: 'tp_situacao_curso'},
        {text: 'Origem', value: 'tp_origem_curso'},
        {text: 'A????es', value: 'action', sortable: false},
      ],
      loading: false,
      dialogDelete: false,
      dialogDeleteData: {},
    }),
    mounted() {
      this.get();
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
        const response = await get('/curso' + filter);
        this.pagination = response.data;
        this.data = response.data.data;
        this.loading = false;
      },
      async filtrar() {
        const filters = await filterFormat(this.filterData);
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
        await remove(`/curso/${id}`);
        this.dialogDelete = false;
        await this.get();
      }
    }
  }
</script>
