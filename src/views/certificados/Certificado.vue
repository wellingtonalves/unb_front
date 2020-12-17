<template>
  <v-container>

    <filter-expansion-panel @filtrar="filtrar" @resetar="limparFiltros()">

      <template v-slot:filterExpansionPanel>

        <v-col cols="12" sm="2">
          <v-select dense v-model="tipoCertificado" label="Tipo do Certificado" :items="tpCertificado" item-text="label"
                    item-value="value"/>
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
    tpCertificado: [
      {
        label: 'Certificado',
        value: 'certificado'
      },
      {
        label: 'Programa',
        value: 'certificado-programa'
      },
    ],
    tpOrigemCurso: [
      'MIGRADO',
      'ENAP'
    ],
    data: [],
    pagination: {},
    options: {},
    headers: [],
    headersCertificado: [
      {text: 'Oferta', value: 'oferta.tx_nome_oferta', align: 'start'},
      {text: 'Curso', value: 'oferta.curso.tx_nome_curso', align: 'start'},
      {text: 'Situação', value: 'tp_situacao_inscricao', align: 'start'},
      {text: 'Data de Término', value: 'oferta.dt_termino_oferta_formatada', align: 'start'},
      {text: 'Ações', value: 'action', sortable: false},
    ],
    headersCertificadoPrograma: [
      {text: 'Programa', value: 'tx_nome_programa', align: 'start'},
      {text: 'Data de Término', value: 'dt_termino_validade_formatada', align: 'start'},
      {text: 'Ações', value: 'action', sortable: false},
    ],
    loading: false,
    dialogDelete: false,
    dialogDeleteData: {},
    tipoCertificado: 'certificado'
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
      let response = await this.getCertificado(filter);

      this.pagination = response.data;
      this.data = response.data.data;
      this.loading = false;
    },
    getCertificado(filter) {
      return new Promise((resolve, reject) => {
        if (this.tipoCertificado === 'certificado') {
          const response = get('/certificado' + filter);
          this.headers = this.headersCertificado
          resolve(response);
        } else if (this.tipoCertificado === 'certificado-programa') {
          const response = get('/certificado-programa' + filter);
          this.headers = this.headersCertificadoPrograma
          resolve(response);
        } else {
          reject();
        }
      })
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
