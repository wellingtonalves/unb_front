<template>
  <v-container v-show="$permissao('ALUNO_INSCRICOES_LISTAR')">
    <v-row class="flex-basis-100">
      <v-col cols="12">
        <v-card>

          <v-data-table
            :headers="headers"
            :items="data"
            :loading="loading"
            disable-pagination
            :hide-default-footer="true"
            :single-expand="true"
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
                    <v-btn small tile outlined color="primary" @click="gerarComprovante(item)" v-on="on">
                      Gerar Comprovante
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
import {get} from "@/services/abstract.service";

export default {
  name: "Inscricoes",
  data(){
    return{
      headers: [
        {text: 'Curso (Oferta)', value: 'oferta.curso.tx_nome_curso', align: 'start'},
        {text: 'Data de Inscrição', value: 'dt_inscricao_formatada', align: 'start'},
        {text: 'Data de Término', value: 'dt_fim_inscricao_formatada', align: 'start'},
        {text: 'Carga Horária', value: 'oferta.qt_carga_horaria_oferta', align: 'start'},
        {text: 'Situação', value: 'tp_situacao_inscricao', align: 'start'},
        {text: 'Ações', value: 'action', sortable: false},
      ],
      expanded: [],
      data: [],
      pagination: {},
      options: {},
      loading: false
    }
  },
  async mounted(){
    await this.get();
  },
  methods: {
    async get(filter = '') {
      this.loading = true;
      const response = await get('/comprovantes-inscricao' + filter);
      this.pagination = response.data;
      this.data = response.data.data;
      this.loading = false;
    },
    async gerarComprovante(item){
      const response = await get(`/comprovantes-inscricao/${item.id_inscricao}/gerar`, {responseType: 'blob',});

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
      link.setAttribute('download', 'inscricao.pdf');
      document.body.appendChild(link);
      link.click()
    },
  }
}
</script>

<style scoped>

</style>