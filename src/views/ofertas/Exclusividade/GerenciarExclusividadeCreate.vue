<template>
  <v-layout wrap>

    <h3 class="subheading">
      Oferta:
      <strong>{{oferta.tx_nome_curso + " ( " + oferta.tx_nome_oferta + " )"}}</strong>
    </h3>

    <card-default>

      <form-skeleton :loading="loadingOferta" />

      <div v-show="!loadingOferta">
        
        <v-form lazy-validation ref="form">
          <v-row>
            <v-col>
              <v-text-field
                outlined
                label="Valor"
                required
                v-model="valor_exclusividade"
                :error-messages="errors.valor_exclusividade"
              />
            </v-col>
            <v-col>
              <v-file-input label="Carregar arquivo" 
                            outlined 
                            dense 
                            accept=".csv"
                            v-model="anexo"
                            :error-messages="errors.anexo"
              />
            </v-col>
          </v-row>
        </v-form>

        <v-alert text icon="mdi-information" color="warning">
          <h3>Atenção!</h3>
          <p>Caso queira adicionar um arquivo com os critérios, siga o seguinte padrão:</p>
          <v-divider class="mb-3"></v-divider>
          <p class="mb-1">Formato do Arquivo: <strong>csv</strong></p>
          <p class="mb-1">Separado por: <strong>',' (Vírgula)</strong></p>
          <p class="mb-1">Primeira Célula (OBRIGATORIAMENTE), com o texto:<strong> 'valores'</strong></p>
          <p class="mb-1">Exemplo:</p>
          <ul class="mb-6">
            <li v-for="(item, i) in valoresExemplo" :key="i">
              {{ item.text }}
            </li>
          </ul>
          <p>Você pode <a :href="arquivoDownload" download>baixar o arquivo de Exemplo</a>.</p>
        </v-alert>

        <v-row class="mt-5" justify="center">
          <v-btn class="mx-2" @click="$router.go(-1)">
            <v-icon class="mr-2">mdi-backup-restore</v-icon>
            Voltar
          </v-btn>

          <v-btn class="mx-2" color="primary" :loading="loading" @click="save()">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Salvar
          </v-btn>
        </v-row>
      </div>
      
    </card-default>
  </v-layout>
</template>

<script>
  import {get, create} from "@/services/abstract.service";
  export default {
    name: "GerenciarExclusividadeCreate",
    data: () => ({
      data: {},
      loadingOferta: true,
      loading: false,
      oferta: {},
      valor_exclusividade: '',
      tipoExclusividade: null,
      anexo: null,
      formData: new FormData(),
      errors: [],
      arquivoDownload: '',
      valoresExemplo: [],
      valoresExemplosEmail: [
        {text: 'enap.gov.br'},
        {text: 'tcu.com.br'},
        {text: 'gmail.com'},
        {text: 'outlook.com'},
      ],
      valoresExemplosCpf: [
        {text: '12345678910'},
        {text: '93413498002'},
        {text: '36265229036'},
        {text: '04762183067'},
      ],
      valoresExemplosMisto: [
        {text: 'enap.gov.br'},
        {text: 'tcu.com.br'},
        {text: 'gmail.com'},
        {text: 'outlook.com'},
        {text: '12345678910'},
        {text: '93413498002'},
        {text: '36265229036'},
        {text: '04762183067'},
      ],
    }),
    watch: {},
    async mounted() {
      await this.getOferta();
      this.verificarTipoExclusividade();
      this.loadingOferta = false;
    },
    methods: {
      async getOferta() {
        const response = await get(`ofertas/${this.$route.params.id}`);
        this.oferta = response.data.data;
        this.tipoExclusividade = this.oferta.exclusividade.id_tipo_exclusividade_oferta;
      },
      verificarTipoExclusividade() {
        this.valoresExemplo = this.valoresExemplosEmail;
        this.arquivoDownload = '/arquivos/exemplo_emails.csv';
        
        if (this.tipoExclusividade == 2) {
          this.valoresExemplo = this.valoresExemplosCpf;
          this.arquivoDownload = '/arquivos/exemplo_cpfs.csv'
          return;
        }

        if (this.tipoExclusividade == 3) {
          this.valoresExemplo = this.valoresExemplosMisto;
          this.arquivoDownload = '/arquivos/exemplo_misto.csv'
          return;
        }
      },
      async save() {
        this.loading = true;
        const idExclusividadeOferta = this.$route.params.id_exclusividade;
        const response = await this.montarForm(idExclusividadeOferta);
        this.loading = false;
        
        if (response.errors) {
          this.errors = response.errors;
          return false
        }
        
        this.$router.go(-1);
        
      },
      async montarForm(idExclusividadeOferta) {
        if (this.anexo) {

          this.formData.append('id_exclusividade_oferta', idExclusividadeOferta);
          this.formData.append('anexo', this.anexo);
          const response = await create('valor-exclusividade-oferta', this.formData);
          return response;
        }

        this.data.id_exclusividade_oferta = idExclusividadeOferta;
        this.data.valor_exclusividade = this.valor_exclusividade;

        const response = await create('valor-exclusividade-oferta', this.data);
        return response;
      }
    }
  }
</script>
