<template>
  <v-layout wrap>
    <card-default>

      <h3>
        Oferta:
        {{oferta.tx_nome_curso + " ( " + oferta.tx_nome_oferta + " )"}}
      </h3>

      <v-form lazy-validation ref="form">
        <v-row>
          <v-text-field
            outlined
            label="Valor"
            required
            v-model="valor_exclusividade"
          />
        </v-row>
        
        <v-row>
          <v-file-input label="Carregar arquivo"  outlined dense v-model="anexo"/> 
        </v-row>
        
      </v-form>
      
      <div>
        <v-alert text color="warning">
                <span>
                    <strong>Atenção!</strong>
                    Caso queira adicionar um arquivo com os critérios, siga o seguinte padrão:
                </span>
        </v-alert>

        <p>Formato do Arquivo: <span style="color: red">csv</span></p>
        <p>Separado por: <span style="color: red">',' (Vírgula)</span></p>
        <p>Primeira Célula <span style="color: red">(OBRIGATORIAMENTE)</span>, com o texto:<span style="color: red"> 'valores'</span></p>
        <p>Exemplo:</p>
        
        <v-list>
          <v-list-item v-for="(item, i) in ValoresExemplosEmail" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item.text" />
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <p>Baixe o arquivo de Exemplo: aqui</p>
      </div>
      
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

      
    </card-default>
  </v-layout>
</template>

<script>
  import {get, create} from "@/services/abstract.service";
  export default {
    name: "GerenciarExclusividadeCreate",
    data: () => ({
      data: {},
      loading: false,
      oferta: {},
      valor_exclusividade: '',
      anexo: null,
      formData: new FormData(),
      errors: [],
      ValoresExemplosEmail: [
        {text: 'enap.gov.br'},
        {text: 'tcu.com.br'},
        {text: 'gmail.com'},
        {text: 'outlook.com'},
      ],
    }),
    watch: {},
    async mounted() {
      await this.getOferta();
    },
    methods: {
      async getOferta() {
        const response = await get(`ofertas/${this.$route.params.id}`);
        this.oferta = response.data.data;
      },
      async save() {
        this.loading = true;
        console.log('id_exclusividade_oferta');
        console.log(this.$route.params.id_exclusividade);
        
        if (this.anexo) {
          console.log('ANEXO');
          this.loading = false;
          return false;
        }

        console.log('SEM ANEXO');
        this.data.id_exclusividade_oferta = this.$route.params.id_exclusividade;
        this.data.valor_exclusividade = this.valor_exclusividade;
        
        const response = await create('valor-exclusividade-oferta', this.data);
        this.loading = false;
        if (response.errors) {
          this.errors = response.errors;
          return false
        }
        
        this.$router.go(-1);
        
      }
    }
  }
</script>
