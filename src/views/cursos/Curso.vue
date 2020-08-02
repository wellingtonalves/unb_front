<template>
  <v-container>
    <v-layout text-center wrap>
      <v-container>
        <v-row>
          <v-expansion-panels :value="0">
            <v-expansion-panel>
              <v-expansion-panel-header>
                Utilize os filtros abaixo, para buscar o curso
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-col>

                  <v-form ref="form" lazy-validation>
                    <v-row align="center">

                      <v-col class="d-flex" cols="4" sm="6">
                        <v-select solo label="Status do curso" :items="statusCurso" item-text="label" item-value="value" />

                      </v-col>

                      <v-col class="d-flex" cols="4" sm="6">
                        <v-select solo label="Origem do curso" :items="tpOrigemCurso" item-text="label" item-value="value" />
                      </v-col>

                    </v-row>

                    <v-row align="center">
                      <v-col class="d-flex" cols="6" sm="8">
                        <v-text-field
                          solo
                          placeholder="Digite o nome do curso"
                        />
                      </v-col>

                      <v-col class="d-flex justify-center" cols="6" sm="4">
                        <v-btn color="primary" dark outlined rounded class="mb-8">
                          <v-icon>mdi-magnify</v-icon>
                          Pesquisar
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>

                </v-col>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
        
        <v-row>
          <v-card height="100%" width="100%" raised style="margin-top: 30px" elevation="10">

            <v-card>

              <v-data-table
                :headers="headers"
                :items="data"
                :search="search"
                sort-by="tx_nome_curso"
                class="elevation-1"
                :loading="loading"
                no-data-text="Nenhum registro encontrado"
                no-results-text="Nenhum registro encontrado"
                loading-text="Aguarde, estamos carregando os dados.">

                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Lista de usuários</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Procurar"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-toolbar>
                </template>

                <template v-slot:item.tp_situacao_curso="{ item }">
                  <p v-if="item.tp_situacao_curso == 'A'">Ativo</p>
                  <p v-else>Inativo</p>
                </template>

                <template v-slot:item.action="{ item }">

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn small class="mr-2" color="primary" icon @click="editar(item.id_curso)" v-on="on">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Editar</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn small class="mr-2" color="error" icon @click="detalhar(item.id_curso)" v-on="on">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Visualizar</span>
                  </v-tooltip>

                </template>

                <template v-slot:no-data>
                  <h4>Nenhum registro encontrado</h4>
                </template>
              </v-data-table>

            </v-card>
          </v-card>
        </v-row>
        
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
  import {getAll} from "@/services/abstract.service";

  export default {
    name: "Curso",
    data: () => ({
      statusCurso: [
        'ATIVO',
        'INATIVO'
      ],
      tpOrigemCurso: [
        'MIGRADO',
        'ENAP'
      ],
      data:  [],
      search: '',
      headers: [
        {text: 'id', value: 'id_curso'},
        {text: 'Curso', value: 'tx_nome_curso'},
        {text: 'Carga Horaria Minima', value: 'qt_carga_horaria_minima'},
        {text: 'Status', value: 'tp_situacao_curso'},
        {text: 'Origem', value: 'tp_origem_curso'},
        {text: 'Ações', align: 'center', value: 'action', sortable: false},
      ],
      loading: false,
    }),
    mounted() {
      this.getAll();
    },
    methods: {
      async getAll() {
        this.loading = true;
        const response = await getAll('/cursos');
        this.data = response.data.data;
        this.loading = false;
        console.log(response);
      },
      async editar() {
        console.log('editar');
      },
      async detalhar() {
        console.log('detalhar');
      }
    }
  }
</script>

<style scoped>

</style>