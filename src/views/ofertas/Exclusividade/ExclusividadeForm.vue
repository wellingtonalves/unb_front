<template>
  <form-skeleton :loading="loading">
    <v-form lazy-validation ref="form" v-show="!loading" v-model="validForm">
      <v-row>

        <v-col cols="12" sm="6">
          <v-select v-model="dataResponse.id_tipo_exclusividade_oferta" :error-messages="errorData.id_tipo_exclusividade_oferta"
                    :rules="rules.required"
                    outlined label="Tipo de Exclusividade" :items="tipoExclusividade" item-text="tx_descricao_tipo_exclusividade_oferta"
                    item-value="id_tipo_exclusividade_oferta"/>
        </v-col>
        <v-col cols="12" sm="6">
          <v-autocomplete v-model="dataResponse.id_orgao_parceiro" :error-messages="errorData.id_orgao_parceiro" :rules="rules.required"
                    outlined label="Parceiros" :items="parceiros" item-text="tx_nome_parceiros" item-value="id_parceiros" 
                          no-data-text="Nenhum resgistro encontrado."/>
        </v-col>

      </v-row>
      <v-row>

        <v-col>
          <v-textarea
            v-model="dataResponse.tx_descricao_exclusividade"
            :error-messages="errorData.tx_descricao_exclusividade"
            :rules="rules.required"
            outlined
            label="Descrição"
            required/>
        </v-col>
      </v-row>

      <v-row class="mt-5" justify="center">
        <slot name="buttons"></slot>
      </v-row>

    </v-form>
  </form-skeleton>
</template>

<script>
  import {get} from "@/services/abstract.service";

  export default {
    name: "ExclusividadeForm",
    props: ['data', 'errors'],
    data: () => ({
      loading: true,
      validForm: false,
      dataResponse: {} || this.data,
      errorData: {},
      rules: {
        required: [v => !!v || 'Campo obrigatório'],
      },
      tipoExclusividade: [],
      parceiros: [],
    }),
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
      await this.getTipoExclusividade();
      await this.getParceiros();
      this.loading = false
    },
    methods: {
      async getOferta() {
        // const response = await get('/oferta/');
      },
      async getTipoExclusividade() {
        const response = await get('/tipo-exclusividade-oferta');
        this.tipoExclusividade = response.data.data;
      },
      async getParceiros() {
        const response = await get('/parceiros');
        this.parceiros = response.data.data;
      },
    }
  }
</script>
