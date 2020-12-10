<template>
  <v-layout wrap>

    <filter-expansion-panel @filtrar="filtrar" @resetar="limparFiltros()" :open="0">
      <template v-slot:filterExpansionPanel>
        <v-col cols="12" sm="2">
          <v-select dense v-model="situacaoCurso" label="Situação" :items="situacaoCursoSelect" item-text="label" item-value="value" />
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
            item-key="id_curso"
            sort-by="tx_nome_curso"
            class="elevation-1"
            no-data-text="Nenhum registro encontrado."
            no-results-text="Nenhum registro encontrado."
            loading-text="Aguarde, estamos carregando os dados.">

            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Listagem de Cursos</v-toolbar-title>
              </v-toolbar>
            </template>
            

            <template v-slot:item.action="{ item }">
              <v-layout wrap class="action-buttons">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn small tile outlined icon color="primary" @click="goToCourse(`${item.tx_url_ava}`)" v-on="on">
                      <v-icon>mdi-arrow-top-right</v-icon>
                    </v-btn>
                  </template>
                  <span>Ver Curso</span>
                </v-tooltip>
              </v-layout>
            </template>
          </v-data-table>

        </v-card>
      </v-col>
    </v-row>

  </v-layout>
</template>

<script>
  import {get} from "@/services/abstract.service";
  import {filterFormat} from "@/helpers/filterFormat";
  export default {
    name: "CursoAndamentoFinalizadosTrancado",
    data: () => ({
      expanded: [],
      situacaoCurso: 'andamento',
      filterData: {},
      search: '',
      situacaoCursoSelect: [
        {
          label: 'Andamento',
          value: 'andamento'
        },
        {
          label: 'Finalizados',
          value: 'finalizado'
        },
        {
          label: 'Trancados',
          value: 'trancado'
        },
      ],
      data:  [],
      pagination: {},
      options: {},
      headers: [
        {text: 'Curso', value: 'oferta.curso.tx_nome_curso', align: 'start',},
        {text: 'Início', value: 'dt_inscricao_formatada', align: 'center',},
        {text: 'Término', value: 'dt_fim_inscricao_formatada'},
        {text: 'Carga horária', value: 'oferta.qt_carga_horaria_oferta'},
        {text: 'Disponibilidade', value: 'oferta.qt_duracao_dias'},
        {text: 'Nota Minímia', value: 'oferta.qt_nota_minima_aprovacao'},
        {text: 'Situação', value: 'tp_situacao_inscricao'},
        {text: 'Ações', value: 'action', sortable: false},
      ],
      loading: false,
      dialogDelete: false,
      dialogDeleteData: {},
    }),
    watch: {
      options: {
        handler (val) {
          if (val.itemsPerPage == '-1') {
            this.get(`?pagination=false`);
            return 
          }
          
          if (this.situacaoCurso) {
            this.get(`?per_page=${val.itemsPerPage}&page=${val.page}`);  
          }
        },
        deep: true,
      },
    },
    methods: {
      async get(filter = '') {
        this.loading = true;
        const response = await get(`/inscricao/cursos-aluno/${this.situacaoCurso}` + filter);
        this.pagination = response.data;
        this.data = response.data.data;
        this.loading = false;
      },
      async filtrar() {
        const filters = await filterFormat(this.filterData);
        
        console.log('?search=' + filters + '&searchJoin=and')
        await this.get('?search=' + filters + '&searchJoin=and');
      },
      limparFiltros() {
        this.filterData = {};
        this.get();
      },
      goToCourse(url) {
        window.open(url, '_blank');
      },
    }
  }
</script>
