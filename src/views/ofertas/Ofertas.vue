<template>
  <v-container>

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

                <v-btn v-show="$permissao('OFERTA_INCLUIR')" color="primary" dark outlined rounded
                       @click="$router.push('/ofertas/create')">
                  <v-icon>mdi-plus</v-icon>
                  Novo
                </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.action="{ item }">

              <v-layout wrap class="action-buttons">

                <div v-if="item.exclusividade">
                  <v-btn small outlined tile v-show="$permissao('OFERTA_EDITAR')" color="primary"
                         @click="$router.push(`/ofertas/${item.id_oferta}/gerenciar-exclusividade`)">
                         <v-icon>mdi-cog</v-icon>
                    Gerenciar Exclusividade
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn small outlined tile v-show="$permissao('EXCLUSIVIDADE_OFERTA_INCLUIR')" color="primary" 
                         @click="$router.push(`/ofertas/${item.id_oferta}/exclusividade`)">
                         <v-icon>mdi-thumb-up</v-icon>
                    Tornar Exclusiva
                  </v-btn>
                </div>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn small tile outlined icon v-show="$permissao('OFERTA_EDITAR')" color="primary"
                           @click="$router.push(`/ofertas/${item.id_oferta}/edit`)" v-on="on">
                      <v-icon>mdi-pencil</v-icon>
                      <span class="d-sr-only">Editar</span>
                    </v-btn>
                  </template>
                  <span>Editar</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn small tile outlined icon v-show="$permissao('OFERTA_EXCLUIR')" color="error" @click="excluir(item)" v-on="on">
                      <v-icon>mdi-delete</v-icon>
                      <span class="d-sr-only">Excluir</span>
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

    <dialog-delete-component :text="dialogDeleteData.tx_nome_oferta" v-model="dialogDelete" @excluir="excluirItem(dialogDeleteData.id_oferta)"></dialog-delete-component>
  </v-container>
</template>

<script>
import {get} from "@/services/abstract.service";
import {filterFormat} from "@/helpers/filterFormat";
import {remove} from "../../services/abstract.service";

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
