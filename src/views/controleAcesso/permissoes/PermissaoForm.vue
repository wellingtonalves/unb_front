<template>
  <div>
    <v-form lazy-validation ref="form" v-model="validForm">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="dataResponse.tx_nome_permissao"
            :error-messages="errorData.tx_nome_permissao"
            :rules="rules.required"
            outlined
            label="Nome da Permissão"
            required />
        </v-col>
      </v-row>

      <v-row class="mt-5" justify="center">
        <slot name="buttons"></slot>
      </v-row>

    </v-form>
  </div>
</template>

<script>
  export default {
    name: "PermissaoForm",
    props: ['data', 'errors'],
    data: () => ({
      validForm: false,
      dataResponse: {} || this.data,
      errorData: {},
      rules: {
        required: [v => !!v || 'Campo obrigatório'],
      },
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
    mounted() {},
    methods: {}
  }
</script>
