<template>
  <v-layout wrap class="align-stretch">

    <filter-expansion-panel @filtrar="filtrar" @resetar="limparFiltros()">

      <template v-slot:filterExpansionPanel>

        <v-col cols="12" sm="2">
          <v-select dense v-model="filterData.id_ava" label="AVA" no-data-text="Nenhum registro encontrado."
                    :items="ava" item-text="tx_nome_ava" item-value="id_ava"/>
        </v-col>
        <v-col cols="12" sm="2">
          <v-select dense v-model="filterData.id_tipo_oferta" label="Tipo"
                    no-data-text="Nenhum registro encontrado." :items="tipoOferta" item-text="tx_nome_tipo_oferta"
                    item-value="id_tipo_oferta"/>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field dense
                        v-model="filterData.tx_nome_oferta"
                        label="Nome da Oferta"
                        placeholder="Informe o nome da Oferta"
          />
        </v-col>
        <v-col cols="12" sm="3">
          <v-autocomplete
            v-model="filterData.id_curso"
            :items="cursos"
            :loading="loadingCursos"
            :search-input.sync="getCursos"
            color="white"
            hide-selected
            dense
            no-data-text="Nenhum registro encontrado."
            item-text="tx_nome_curso"
            item-value="id_curso"
            label="Nome do Curso"
            placeholder="Informe o nome do Curso"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="2">
          <v-select dense v-model="filterData.tp_situacao_oferta" no-data-text="Nenhum registro encontrado."
                    label="Situação" :items="situacaoOferta" item-text="label" item-value="value"/>
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
            item-key="id_oferta"
            sort-by="tx_nome_oferta"
            class="elevation-1"
            no-data-text="Nenhum registro encontrado."
            no-results-text="Nenhum registro encontrado."
            loading-text="Aguarde, estamos carregando os dados.">

            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Listagem de Ofertas</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn v-show="permission('OFERTA_INCLUIR')" color="primary" dark outlined rounded
                       @click="$router.push('/ofertas/create')">
                  <v-icon>mdi-plus</v-icon>
                  Novo
                </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.action="{ item }">

              <div v-if="item.exclusividade">
                <v-btn v-show="permission('OFERTA_EDITAR')" small color="primary" outlined
                       @click="$router.push(`/ofertas/${item.id_oferta}/gerenciar-exclusividade`)">
                  Gerenciar Exclusividade
                </v-btn>
              </div>
              <div v-else>
                <v-btn v-show="permission('EXCLUSIVIDADE_OFERTA_INCLUIR')" small color="primary" outlined
                       @click="$router.push(`/ofertas/${item.id_oferta}/exclusividade`)">
                  Tornar Exclusiva
                </v-btn>
              </div>


              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-show="permission('OFERTA_EDITAR')" small color="primary" icon
                         @click="$router.push(`/ofertas/${item.id_oferta}/edit`)" v-on="on">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Editar</span>
              </v-tooltip>

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

    <dialog-delete-component :text="dialogDeleteData.tx_nome_oferta" v-model="dialogDelete" @excluir="excluirItem(dialogDeleteData.id_oferta)"></dialog-delete-component>
  </v-layout>
</template>

<script>
import {get} from "@/services/abstract.service";
import {filterFormat} from "@/helpers/filterFormat";
import {remove} from "../../services/abstract.service";
import {checkPermission} from "@/helpers/checkPermission";

export default {
  name: "Ofertas",
  data: () => ({
    expanded: [],
    filterData: {},
    situacaoOferta: [
      {
        label: 'EM CURSO',
        value: 'EM_CURSO'
      },
      {
        label: 'CONCLUÍDA',
        value: 'CONCLUIDA'
      },
      {
        label: 'PUBLICADA',
        value: 'PUBLICADA'
      },
      {
        label: 'CONFIRMADA',
        value: 'CONFIRMADA'
      },
    ],
    data: [],
    pagination: {},
    options: {},
    headers: [
      {text: 'ID', value: 'id_oferta'},
      {text: 'ID Curso', value: 'id_curso'},
      {text: 'Nome da Oferta', value: 'tx_nome_oferta', align: 'start',},
      {text: 'Situação', value: 'tp_situacao_oferta'},
      {text: 'Total de Inscrições', value: 'total_inscricoes'},
      {text: 'Ações', value: 'action', sortable: false},
    ],
    loading: false,
    dialogDelete: false,
    dialogDeleteData: {},
    tipoOferta: [],
    ava: [],
    loadingCursos: false,
    getCursos: null,
    cursos: []
  }),
  mounted() {
    this.get();
    this.getTipoOferta();
    this.getAva();
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
    getCursos(value) {
      if (this.loadingCursos) return

      this.loadingCursos = true
      get(`/curso?pagination=false&search=tx_nome_curso:${value}`).then(response => {
        this.cursos = response.data.data
      }).finally(() => {
        this.loadingCursos = false;
      })
    }
  },
  methods: {
    async get(filter = '') {
      this.loading = true;
      const response = await get('/ofertas' + filter);
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
      await remove(`/ofertas/${id}`);
      this.dialogDelete = false;

      await this.get();
    },
    permission(rule) {
      return checkPermission(rule);
    },
    getTipoOferta() {
      get('/tipo-oferta?pagination=false').then(response => {
        this.tipoOferta = response.data.data
      })
    },
    getAva() {
      get('/ava?pagination=false').then(response => {
        this.ava = response.data.data
      })
    }
  }
}
</script>
