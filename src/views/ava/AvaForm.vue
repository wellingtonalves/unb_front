<template>
  <div>
    <form-skeleton :loading="loading">
      <v-form lazy-validation ref="form" v-model="validForm" v-show="!loading">
        <v-row>
          
          <v-col class="d-flex" cols="12" sm="6">
            <v-select v-model="dataResponse.id_orgao" :error-messages="errorData.id_orgao" :rules="rules.required" 
                      outlined label="Órgão" :items="orgao" item-text="tx_nome_orgao" item-value="id_orgao" />
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-select v-model="dataResponse.tp_ava" :error-messages="errorData.tp_ava" :rules="rules.required"
                      outlined label="Tipo de AVA" :items="tipoAva" item-text="tp_ava" item-value="tp_ava" />
          </v-col>

        </v-row>
        <v-row>

          <v-col class="d-flex">
            <v-text-field
              v-model="dataResponse.tx_nome_ava"
              :error-messages="errorData.tx_nome_ava"
              :rules="rules.required"
              outlined
              label="Nome do AVA"
              required />
          </v-col>

        </v-row>
        <v-row>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              v-model="dataResponse.tx_url"
              :error-messages="errorData.tx_url"
              :rules="rules.required"
              outlined
              label="URL"
              required />
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              v-model="dataResponse.tx_token"
              :error-messages="errorData.tx_token"
              :rules="rules.required"
              outlined
              label="Token"
              required />
          </v-col>

        </v-row>
        <v-row>

          <v-col class="d-flex" cols="12" sm="6">
            <v-select v-model="dataResponse.tp_situacao_ava" :error-messages="errorData.tp_situacao_ava" :rules="rules.required"
                      outlined label="Status do AVA" :items="statusAva" item-text="label" item-value="value" />
          </v-col>
          
          <v-col class="d-flex" cols="12" sm="6">
            <v-select v-model="dataResponse.tp_operacional" :error-messages="errorData.tp_operacional" :rules="rules.required"
                      outlined label="Operacional" :items="operacional" item-text="label" item-value="value" />
          </v-col>
          
        </v-row>

        <v-row class="mt-5" justify="center">
          <slot name="buttons"></slot>
        </v-row>

      </v-form>
    </form-skeleton>
  </div>
</template>

<script>
  import {get} from "@/services/abstract.service";
  
  export default {
    name: "AvaForm",
    props: ['data', 'errors'],
    data: () => ({
      loading: true,
      validForm: false,
      dataResponse: {} || this.data,
      errorData: {},
      rules: {
        required: [v => !!v || 'Campo obrigatório'],
      },
      statusAva: [
        {
          label: 'ATIVO',
          value: 'A'
        },
        {
          label: 'INATIVO',
          value: 'I'
        },
      ],
      operacional: [
        {
          label: 'Sim',
          value: 'S'
        },
        {
          label: 'Não',
          value: 'N'
        },
      ],
      tipoAva: [
        'MOODLE',
        'CANVAS'
      ],
      orgao: []
    }),
    computed: {},
    watch: {
      dataResponse: function (val) {
        this.$emit('update', val);
      },
      errors: function (val) {
        this.errorData = val;
      },
      data: function (val) {
        this.dataResponse = val;
      },
    },
    async mounted() {
      await this.getOrgao();
      this.loading = false
    },
    methods: {
      async getOrgao() {
          return get('/orgao?pagination=false&orderBy=tx_nome_orgao').then(response => {
              this.orgao = response.data.data
          })
      }
    }
  }
</script>
