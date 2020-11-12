<template>
  <v-layout v-show="permission('TAREFA_AGENDADA_LISTAR')" wrap class="align-stretch">

    <filter-expansion-panel @filtrar="filtrar" @resetar="limparFiltros()">

      <v-col cols="12" sm="2">
        <v-select dense v-model="filterData.tp_situacao_tarefa_agendada" label="Status" :items="statusTarefaAgendada" item-text="label" item-value="value" />
      </v-col>

      <v-col cols="12" sm="3">
        <v-text-field dense
          v-model="filterData.tx_nome_tarefa_agendada"
          label="Nome"
          placeholder="Informe o nome da tarefa"
        />
      </v-col>

      <v-col cols="12" sm="3">
        <v-text-field dense
          v-model="filterData.tx_nome_comando"
          label="Comando"
          placeholder="Informe o comando da tarefa"
        />
      </v-col>

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
            item-key="id_tarefa_agendada"
            sort-by="tx_nome_tarefa_agendada"
            class="elevation-1"
            no-data-text="Nenhum registro encontrado."
            no-results-text="Nenhum registro encontrado."
            loading-text="Aguarde, estamos carregando os dados.">

            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Listagem das Tarefas Agendadas</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn v-show="permission('TAREFA_AGENDADA_INCLUIR')" color="primary" dark outlined rounded @click="$router.push('/tarefa-agendada/create')">
                  <v-icon>mdi-plus</v-icon>
                  Novo
                </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.tp_situacao_tarefa_agendada="{ item }">
              <p v-if="item.tp_situacao_tarefa_agendada == 'A'">Ativo</p>
              <p v-else>Inativo</p>
            </template>

            <template v-slot:item.action="{ item }">

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-show="permission('TAREFA_AGENDADA_EDITAR')" small color="primary" icon @click="$router.push(`/tarefa-agendada/${item.id_tarefa_agendada}/edit`)" v-on="on">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Editar</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-show="permission('TAREFA_AGENDADA_EXCLUIR')" small color="error" icon @click="excluir(item)" v-on="on">
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
          <v-card-text>Deseja excluir o registro <strong>{{dialogDeleteData.tx_nome_tarefa_agendada}}</strong> ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialogDelete = false">Cancelar</v-btn>
            <v-btn color="primary" text @click="excluirItem(dialogDeleteData.id_tarefa_agendada)">Confirmar</v-btn>
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
    name: "TarefaAgendada",
    data: () => ({
      expanded: [],
      filterData: {},
      statusTarefaAgendada: [
        {
          label: 'ATIVO',
          value: 'A'
        },
        {
          label: 'INATIVO',
          value: 'I'
        },
      ],
      data:  [],
      pagination: {},
      options: {},
      headers: [
        {text: 'ID', value: 'id_tarefa_agendada'},
        {text: 'Nome', value: 'tx_nome_tarefa_agendada', align: 'start',},
        {text: 'Comando', value: 'tx_nome_comando', align: 'center',},
        {text: 'CRON', value: 'cron', align: 'center',},
        {text: 'AVA', value: 'ava.tx_nome_ava', align: 'center',},
        {text: 'Última execução', value: 'dt_ultimo_periodo'},
        {text: 'Próxima execução', value: 'dt_proximo_periodo'},
        {text: 'Status', value: 'tp_situacao_tarefa_agendada'},
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
        const response = await get('/tarefa-agendada' + filter);
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
        const response = await remove(`/tarefa-agendada/${id}`);
        this.dialogDelete = false;
        
        this.snackbar.text = response.message;
        this.snackbar.color = response.messageType;
        this.snackbar.active = true;

        await this.get();
      },
      permission(rule) {
        return checkPermission(rule);
      },
    }
  }
</script>
