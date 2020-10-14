<template>
  <v-layout wrap>

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
            item-key="id_perfil"
            sort-by="tx_nome_perfil"
            class="elevation-1"
            no-data-text="Nenhum registro encontrado."
            no-results-text="Nenhum registro encontrado."
            loading-text="Aguarde, estamos carregando os dados.">

            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Listagem de Perfis</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn color="primary" dark outlined rounded @click="$router.push('/perfil/create')">
                  <v-icon>mdi-plus</v-icon>
                  Novo
                </v-btn>
              </v-toolbar>
            </template>
            

            <template v-slot:item.action="{ item }">

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn small color="primary" icon @click="$router.push(`/perfil/${item.id_perfil}/edit`)" v-on="on">
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
            
          </v-data-table>

        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialogDelete" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">Atenção!</v-card-title>
          <v-card-text>Deseja excluir o registro <strong>{{dialogDeleteData.tx_nome_perfil}}</strong> ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialogDelete = false">Cancelar</v-btn>
            <v-btn color="primary" text :loading="dialogDeleteLoading" @click="excluirItem(dialogDeleteData.id_perfil)">Confirmar</v-btn>
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
  import {get, remove} from "@/services/abstract.service";
  
  export default {
    name: "Perfil",
    data: () => ({
      data:  [],
      pagination: {},
      options: {},
      headers: [
        {text: 'id', value: 'id_perfil'},
        {text: 'Perfil', value: 'tx_nome_perfil', align: 'start'},
        {text: 'Ações', value: 'action', sortable: false},
      ],
      loading: false,
      dialogDeleteLoading: false,
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
        const response = await get('/perfil' + filter);
        this.pagination = response.data;
        this.data = response.data.data;
        this.loading = false;
      },
      excluir(item) {
        this.dialogDeleteData = item;
        this.dialogDelete = true;
      },
      async excluirItem(id) {
        this.dialogDeleteLoading = true;
        const response = await remove(`/perfil/${id}`);
        this.dialogDeleteLoading = false;
        this.dialogDelete = false;
        
        this.snackbar.text = response.message;
        this.snackbar.color = response.messageType;
        this.snackbar.active = true;

        await this.get();
      }
    }
  }
</script>
