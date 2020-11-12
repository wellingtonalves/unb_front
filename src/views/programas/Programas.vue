<template>
  <v-layout wrap class="align-stretch">
    <filter-expansion-panel @filtrar="filtrar" @resetar="limparFiltros()">
      <v-form ref="form" lazy-validation>
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-text-field dense
                          v-model="filterData.tx_nome_programa"
                          label="Nome do Programa"
                          placeholder="Informe o nome do Programa"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select dense v-model="filterData.tp_situacao_programa" label="Situação" :items="situacaoPrograma" item-text="label" item-value="value" />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select dense v-model="filterData.bl_programa_destaque" label="Destaque" :items="statusDestaque" item-text="label" item-value="value" />
          </v-col>
        </v-row>
      </v-form>
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
            item-key="id_programa"
            sort-by="tx_nome_programa"
            class="elevation-1"
            no-data-text="Nenhum registro encontrado."
            no-results-text="Nenhum registro encontrado."
            loading-text="Aguarde, estamos carregando os dados.">

            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Listagem de Programas</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn v-show="permission('PROGRAMA_INCLUIR')" color="primary" dark outlined rounded @click="$router.push('/programas/create')">
                  <v-icon>mdi-plus</v-icon>
                  Novo
                </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.bl_programa_destaque="{ item }">
              <p v-if="item.bl_programa_destaque == 1">Sim</p>
              <p v-else>Não</p>
            </template>

            <template v-slot:item.tp_situacao_programa="{ item }">
              <p v-if="item.tp_situacao_programa == 'A'">Ativo</p>
              <p v-else>Inativo</p>
            </template>

            <template v-slot:item.action="{ item }">

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-show="permission('PROGRAMA_EDITAR')" small color="primary" icon @click="$router.push(`/programas/${item.id_programa}/edit`)" v-on="on">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Editar</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-show="permission('PROGRAMA_EXCLUIR')" small color="error" icon @click="excluir(item)" v-on="on">
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
          <v-card-text>Deseja excluir o registro <strong>{{dialogDeleteData.tx_nome_programa}}</strong> ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialogDelete = false">Cancelar</v-btn>
            <v-btn color="primary" text @click="excluirItem(dialogDeleteData.id_programa)">Confirmar</v-btn>
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
      situacaoPrograma: [
        {
          label: 'Ativo',
          value: 'A'
        },
        {
          label: 'Inativo',
          value: 'I'
        },
      ],
      statusDestaque: [
        {
          label: 'Sim',
          value: '1'
        },
        {
          label: 'Não',
          value: '0'
        },
      ],
      data:  [],
      pagination: {},
      options: {},
      headers: [
        {text: 'ID', value: 'id_programa'},
        {text: 'Nome do programa', value: 'tx_nome_programa', align: 'start',},
        {text: 'Início da validade', value: 'dt_inicio_validade_formatada', align: 'center',},
        {text: 'Término da validade', value: 'dt_termino_validade_formatada', align: 'center',},
        {text: 'Situação', value: 'tp_situacao_programa'},
        {text: 'Destaque', value: 'bl_programa_destaque'},
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
        const response = await get('/programas' + filter);
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
