<template>
  <v-layout wrap class="align-stretch">

    <v-expansion-panels :value="0">
      <v-expansion-panel>

        <v-expansion-panel-header>
          Filtros
        </v-expansion-panel-header>

        <v-expansion-panel-content>

          <v-form ref="form" lazy-validation>
            <v-row align="center">
              <v-col cols="12" sm="2">
                <v-select dense v-model="filterData.id_ava" label="AVA" :items="ava" item-text="tx_nome_ava" item-value="id_ava" />
              </v-col>
              <v-col cols="12" sm="2">
                <v-select dense v-model="filterData.id_tipo_oferta" label="Tipo" :items="tipoOferta" item-text="tx_nome_tipo_oferta" item-value="id_tipo_oferta" />
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field dense
                              v-model="filterData.tx_nome_oferta"
                              label="Nome da Oferta"
                              placeholder="Informe o nome da Oferta"
                />
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field dense
                              v-model="filterData.tx_nome_curso"
                              label="Nome do Curso"
                              placeholder="Informe o nome do Curso"
                />
              </v-col>
              <v-col cols="12" sm="2">
                <v-select dense v-model="filterData.tp_situacao_oferta" label="Situação" :items="situacaoOferta" item-text="label" item-value="value" />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex" cols="12" sm="4">

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

                <v-btn v-show="permission('OFERTA_INCLUIR')" color="primary" dark outlined rounded @click="$router.push('/ofertas/create')">
                  <v-icon>mdi-plus</v-icon>
                  Novo
                </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.tp_situacao_ava="{ item }">
              <p v-if="item.tp_situacao_oferta == 'A'">Ativo</p>
              <p v-else>Inativo</p>
            </template>

            <template v-slot:item.action="{ item }">

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-show="permission('OFERTA_EDITAR')" small color="primary" icon @click="$router.push(`/ofertas/${item.id_oferta}/edit`)" v-on="on">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Editar</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-show="permission('OFERTA_EXCLUIR')" small color="error" icon @click="excluir(item)" v-on="on">
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

    <v-row justify="center">
      <v-dialog v-model="dialogDelete" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">Atenção!</v-card-title>
          <v-card-text>Deseja excluir o registro <strong>{{dialogDeleteData.tx_nome_oferta}}</strong> ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialogDelete = false">Cancelar</v-btn>
            <v-btn color="primary" text @click="excluirItem(dialogDeleteData.id_oferta)">Confirmar</v-btn>
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
  import {checkPermission} from "@/helpers/checkPermission";

  export default {
    name: "Ava",
    data: () => ({
      expanded: [],
      filterData: {},
      situacaoOferta: [
        {
          label: 'EM_CURSO',
          value: 'EM_CURSO'
        },
        {
          label: 'CONCLUIDA',
          value: 'CONCLUIDA'
        },
        {
          label: 'PUBLICADA',
          value: 'PUBLICADA'
        },
      ],
      data:  [],
      pagination: {},
      options: {},
      headers: [
        {text: 'ID', value: 'id_oferta'},
        {text: 'ID Curso', value: 'id_curso'},
        {text: 'Nome da Oferta', value: 'tx_nome_oferta', align: 'start',},
        {text: 'Situação', value: 'tp_situacao_oferta'},
        {text: 'Total de Ofertas', value: 'total_ofertas'},
        {text: 'Ações', value: 'action', sortable: false},
      ],
      loading: false,
      dialogDelete: false,
      dialogDeleteData: {},
      snackbar: {
        active: false,
        color: '',
        text: ''
      },
      tipoOferta: [],
      ava: [],
    }),
    mounted() {
      this.get();
      this.getTipoOferta();
      this.getAva();
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
        const response = await remove(`/ofertas/${id}`);
        this.dialogDelete = false;

        this.snackbar.text = response.message;
        this.snackbar.color = response.messageType;
        this.snackbar.active = true;

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
