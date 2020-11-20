<template>
  <v-layout wrap>

    <h3 v-show="!loading" class="subheading">
      Oferta:
      <strong>{{oferta.tx_nome_curso + " ( " + oferta.tx_nome_oferta + " )"}}</strong>
    </h3>

    <form-skeleton :loading="loading" />

    <div v-show="!loading" class="flex-basis-100">
      <v-row>
        <v-col cols="12">

          <v-toolbar>
            <v-toolbar-title class="d-sr-only">Ações</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" v-show="permission('EXCLUSIVIDADE_EDITAR')"
               @click="$router.push(`/ofertas/${oferta.id_oferta}/gerenciar-exclusividade/${oferta.exclusividade.id_exclusividade_oferta}/create`)" class="ma-1">
              Adicionar Valor
            </v-btn>

            <v-btn outlined color="primary" v-show="permission('EXCLUSIVIDADE_EDITAR')"
                   @click="$router.push(`/ofertas/${oferta.id_oferta}/exclusividade/${oferta.exclusividade.id_exclusividade_oferta}/edit`)" class="ma-1">
              Editar
            </v-btn>

            <v-btn outlined color="error" v-show="permission('EXCLUSIVIDADE_EXCLUIR')"
                   @click="excluir()" class="ma-1">
              Remover exclusividade
            </v-btn>
          </v-toolbar>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">

          <v-data-table
            :headers="headersValorExclusividade"
            :items="valorExclusividade"
            :search="searchValorExclusividade"
            item-key="id_valor_exclusividade_oferta"
            sort-by="valor_exclusividade"
            class="elevation-1"
            no-data-text="Nenhum registro encontrado."
            no-results-text="Nenhum registro encontrado.">

            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Valores cadastrados</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchValorExclusividade"
                  append-icon="mdi-magnify"
                  label="Procurar"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar>
            </template>

            <template v-slot:item.action="{ item }">

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-show="permission('VALOR_EXCLUSIVIDADE_EXCLUIR')" small color="error" icon @click="confirmarExcluirValorExclusividade(item)"
                         v-on="on">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Excluir</span>
              </v-tooltip>

            </template>

          </v-data-table>

        </v-col>
      </v-row>

      <v-row class="mt-5" justify="center">
        <v-btn class="mr-4" @click="$router.push('/ofertas')">
          <v-icon class="mr-2">mdi-backup-restore</v-icon>
          Voltar
        </v-btn>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="dialogDelete" persistent max-width="500">
          <v-card>
            <v-card-title class="headline">Atenção!</v-card-title>
            <v-card-text>Deseja remover a exclusividade desta oferta ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="dialogDelete = false">Cancelar</v-btn>
              <v-btn color="primary" text @click="excluirItem(oferta.exclusividade.id_exclusividade_oferta)">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <dialog-delete-component
        :text="dialogValorExclusividadeDeleteData.valor_exclusividade"
        v-model="dialogValorExclusividadeDelete"
        @excluir="excluirValorExclusividade(dialogValorExclusividadeDeleteData.id_valor_exclusividade_oferta)" />
    
    </div>
  </v-layout>
</template>

<script>
  import {get, remove} from "@/services/abstract.service";
  import {checkPermission} from "@/helpers/checkPermission";
  
  export default {
    name: "GerenciarExclusividade",
    data: () => ({
      data: [],
      loading: true,
      oferta: {},
      valorExclusividade: [],
      headersValorExclusividade: [
        {text: 'ID', value: 'id_valor_exclusividade_oferta'},
        {text: 'Valor', value: 'valor_exclusividade'},
        {text: 'Ações', value: 'action', sortable: false},
      ],
      searchValorExclusividade: '',
      errors: [],
      dialogDelete: false,
      dialogValorExclusividadeDelete: false,
      dialogValorExclusividadeDeleteData: {},
    }),
    watch: {},
    async mounted() {
      await this.getOferta();
    },
    methods: {
      permission(rule) {
        return checkPermission(rule);
      },
      async getOferta() {
        const response = await get(`ofertas/${this.$route.params.id}`);
        this.oferta = response.data.data;
        this.valorExclusividade = response.data.data.exclusividade.valor_exclusividade;
        this.loading = false;
      },
      excluir() {
        this.dialogDelete = true;
      },
      async excluirItem(id) {
        await remove(`/exclusividade-oferta/${id}`);
        this.dialogDelete = false;
        this.$router.go(-1);
      },
      confirmarExcluirValorExclusividade(item) {
        this.dialogValorExclusividadeDeleteData = item;
        this.dialogValorExclusividadeDelete = true;
      },
      async excluirValorExclusividade(id) {
        await remove(`/valor-exclusividade-oferta/${id}`);
        this.dialogValorExclusividadeDelete = false;
        await this.getOferta();
      }
    }
  }
</script>
