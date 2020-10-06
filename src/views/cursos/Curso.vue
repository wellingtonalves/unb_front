<template>
  <v-layout wrap>

    <h2>Cursos</h2>
    
    <v-expansion-panels :value="0">
      <v-expansion-panel>

        <v-expansion-panel-header>
          Filtros
        </v-expansion-panel-header>

        <v-expansion-panel-content>

          <v-form ref="form" lazy-validation>
            <v-row align="center">

              <v-col>
                <v-select dense v-model="filterData.tp_situacao_curso" label="Status do curso" :items="statusCurso" item-text="label" item-value="value" />
              </v-col>

              <v-col>
                <v-select dense v-model="filterData.tp_origem_curso" label="Origem do curso" :items="tpOrigemCurso" item-text="label" item-value="value" />
              </v-col>

              <v-col cols="4">
                <v-text-field dense
                  v-model="filterData.tx_nome_curso"
                  label="Nome do curso"
                  placeholder="Informe o nome do curso"
                />
              </v-col>

              <v-col class="d-flex justify-end" cols="4">

                <v-btn color="primary" dark outlined rounded class="mb-8 mr-5" @click="filtrar()">
                  <v-icon>mdi-magnify</v-icon>
                  Pesquisar
                </v-btn>

                <v-btn color="primary" dark outlined rounded class="mb-8" @click="limparFiltros()">
                  <v-icon>mdi-magnify-close</v-icon>
                  Limpar
                </v-btn>
              </v-col>

            </v-row>
          </v-form>

        </v-expansion-panel-content>

      </v-expansion-panel>
    </v-expansion-panels>

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
              <p v-if="item.tp_situacao_curso == 'A'">Ativo</p>
              <p v-else>Inativo</p>
            </template>

            <template v-slot:item.action="{ item }">

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn small color="primary" icon @click="$router.push(`/curso/${item.id_curso}/edit`)" v-on="on">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Editar</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn small color="error" icon @click="excluir(item)" v-on="on">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Visualizar</span>
              </v-tooltip>

            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length"  v-html="item.tx_conteudo_programatico"></td>
            </template>
            
          </v-data-table>

        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialogDelete" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">Atenção!</v-card-title>
          <v-card-text>Deseja excluir o registro <strong>{{dialogDeleteData.tx_nome_curso}}</strong> ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialogDelete = false">Cancelar</v-btn>
            <v-btn color="primary" text @click="excluirItem(dialogDeleteData.id_curso)">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-snackbar v-model="snackbar.active" :color="snackbar.color" :timeout="5000">
      {{snackbar.text}}
      <v-btn text @click.stop="snackbar.active = false">
        Fechar
      </v-btn>
    </v-snackbar>

  </v-layout>
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
        {text: 'id', value: 'id_curso'},
        {text: 'Curso', value: 'tx_nome_curso', align: 'start',},
        {text: 'Carga Horaria Minima', value: 'qt_carga_horaria_minima', align: 'center',},
        {text: 'Status', value: 'tp_situacao_curso'},
        {text: 'Origem', value: 'tp_origem_curso'},
        {text: 'Ações', value: 'action', sortable: false},
      ],
      loading: false,
      dialogDelete: false,
      dialogDeleteData: {},
      snackbar: {
        active: false,
        color: '',
        text: ''
      }
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
        const response = await remove(`/curso/${id}`);
        this.dialogDelete = false;
        
        this.snackbar.text = response.message;
        this.snackbar.color = response.messageType;
        this.snackbar.active = true;

        await this.get();
      }
    }
  }
</script>
