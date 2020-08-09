<template>
  <v-container>
    <v-layout text-center wrap>
      <v-container>
        <v-row>
          <v-expansion-panels :value="0">
            <v-expansion-panel>
              <v-expansion-panel-header>
                Utilize os filtros abaixo, para buscar o curso
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-col>

                  <v-form ref="form" lazy-validation>
                    <v-row align="center">

                      <v-col class="d-flex" cols="4" sm="6">
                        <v-select v-model="filterData.tp_situacao_curso" solo label="Status do curso" :items="statusCurso" item-text="label" item-value="value" />

                      </v-col>

                      <v-col class="d-flex" cols="4" sm="6">
                        <v-select v-model="filterData.tp_origem_curso" solo label="Origem do curso" :items="tpOrigemCurso" item-text="label" item-value="value" />
                      </v-col>

                    </v-row>

                    <v-row align="center">
                      <v-col class="d-flex" cols="6" sm="8">
                        <v-text-field
                          v-model="filterData.tx_nome_curso"
                          solo
                          placeholder="Digite o nome do curso"
                        />
                      </v-col>

                      <v-col class="d-flex justify-center" cols="6" sm="4">

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

                </v-col>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
        
        <v-row>
          <v-card height="100%" width="100%" raised style="margin-top: 30px" elevation="10">

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
                no-data-text="Nenhum registro encontrado"
                no-results-text="Nenhum registro encontrado"
                loading-text="Aguarde, estamos carregando os dados.">

                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Lista de usuários</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
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

                  <v-row>
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
                        <v-btn small color="error" icon @click="excluir(item.id_curso)" v-on="on">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Visualizar</span>
                    </v-tooltip>
                  </v-row>

                </template>

                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length"  v-html="item.tx_conteudo_programatico"></td>
                </template>
                
              </v-data-table>

            </v-card>
          </v-card>
        </v-row>
        
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
  import {get} from "@/services/abstract.service";
  import {filterFormat} from "@/helpers/filterFormat";

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
      async excluir() {
        console.log('detalhar');
      }
    }
  }
</script>

<style scoped>

</style>