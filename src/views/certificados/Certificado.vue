<template>
  <v-container>

<!--    <filter-expansion-panel @filtrar="filtrar" @resetar="limparFiltros()">-->

<!--      <template v-slot:filterExpansionPanel>-->

<!--        <v-col cols="12" sm="2">-->
<!--          <v-select dense v-model="filterData.tp_situacao_curso" label="Status" :items="statusCurso" item-text="label"-->
<!--                    item-value="value"/>-->
<!--        </v-col>-->

<!--        <v-col cols="12" sm="2">-->
<!--          <v-select dense v-model="filterData.tp_origem_curso" label="Origem" :items="tpOrigemCurso" item-text="label"-->
<!--                    item-value="value"/>-->
<!--        </v-col>-->

<!--        <v-col cols="12" sm="3">-->
<!--          <v-text-field dense-->
<!--                        v-model="filterData.tx_nome_curso"-->
<!--                        label="Nome"-->
<!--                        placeholder="Informe o nome do curso"-->
<!--          />-->
<!--        </v-col>-->

<!--      </template>-->

<!--    </filter-expansion-panel>-->

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
            item-key="id_curso"
            sort-by="tx_nome_curso"
            class="elevation-1"
            no-data-text="Nenhum registro encontrado."
            no-results-text="Nenhum registro encontrado."
            loading-text="Aguarde, estamos carregando os dados.">


            <template v-slot:item.action="{ item }">

              <v-layout wrap class="action-buttons">

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn small tile outlined color="primary" @click="gerarCertificado(item)" v-on="on">
                      Gerar Certificado
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </template>
                  <span>Gerar Certificado</span>
                </v-tooltip>

              </v-layout>

            </template>

          </v-data-table>

        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {get, create} from "@/services/abstract.service";
import {filterFormat} from "@/helpers/filterFormat";

export default {
  name: "Certificado",
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
    data: [],
    pagination: {},
    options: {},
    headers: [
      {text: 'Oferta', value: 'oferta.tx_nome_oferta', align: 'start'},
      {text: 'Curso', value: 'oferta.curso.tx_nome_curso', align: 'start'},
      {text: 'Situação', value: 'tp_situacao_inscricao', align: 'start'},
      {text: 'Data de Término', value: 'oferta.dt_termino_oferta_formatada', align: 'start'},
      {text: 'Ações', value: 'action', sortable: false},
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
      handler(val) {
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
      const response = await get('/certificado' + filter);
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
    async gerarCertificado(inscricao) {
      if (!inscricao.certificado) {
        await create('/certificado', {id_inscricao: inscricao.id_inscricao});
      }
      const response = await get(`/certificado/${inscricao.id_inscricao}`, {responseType: 'blob',});

      if (response.status !== 200) {
        return false;
      }
      this.download(response.data)
      await this.get();
    },
    download(file) {
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'certificado.pdf');
      document.body.appendChild(link);
      link.click()
    },
  }
}
</script>
