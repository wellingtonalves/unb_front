<template>
  <div>
    <form-skeleton :loading="loading">
      <v-form lazy-validation ref="form" v-show="!loading" v-model="validForm">
        <v-row>
          <v-col class="d-flex">
            <v-text-field
              v-model="dataResponse.tx_nome_tarefa_agendada"
              :error-messages="errorData.tx_nome_tarefa_agendada"
              :rules="rules.required"
              outlined
              label="Nome da Tarefa"
              required />
          </v-col>
        </v-row>
        <v-row>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              v-model="dataResponse.tx_nome_comando"
              :error-messages="errorData.tx_nome_comando"
              :rules="rules.required"
              outlined
              label="Comando"
              required />
          </v-col>

        </v-row>
        <v-row>

          <v-col class="d-flex" cols="2" >
            <v-text-field
              v-model="dataResponse.tx_minuto"
              :error-messages="errorData.tx_minuto"
              :rules="rules.required"
              outlined
              label="Minuto"
              required />
          </v-col>

          <v-col class="d-flex" cols="2" >
            <v-text-field
              v-model="dataResponse.tx_hora"
              :error-messages="errorData.tx_hora"
              :rules="rules.required"
              outlined
              label="Hora"
              required />
          </v-col>

          <v-col class="d-flex" cols="2" >
            <v-text-field
              v-model="dataResponse.tx_dia_mes"
              :error-messages="errorData.tx_dia_mes"
              :rules="rules.required"
              outlined
              label="Dia do mês"
              required />
          </v-col>

          <v-col class="d-flex" cols="2" >
            <v-text-field
              v-model="dataResponse.tx_mes"
              :error-messages="errorData.tx_mes"
              :rules="rules.required"
              outlined
              label="Mês do ano"
              required />
          </v-col>

          <v-col class="d-flex" cols="2" >
            <v-text-field
              v-model="dataResponse.tx_dia_semana"
              :error-messages="errorData.tx_dia_semana"
              :rules="rules.required"
              outlined
              label="Dia da semana"
              required />
          </v-col>

        </v-row>
        <v-row>

          <v-col class="d-flex" cols="12" sm="6">
            <v-select v-model="dataResponse.id_ava" :error-messages="errorData.id_ava" 
                      outlined label="AVA" :items="ava" item-text="tx_nome_ava" item-value="id_ava" />
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-select v-model="dataResponse.tp_situacao_tarefa_agendada" :error-messages="errorData.tp_situacao_tarefa_agendada" :rules="rules.required"
                      outlined label="Status da Tarefa" :items="statusTarefaAgendada" item-text="label" item-value="value" />
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
    name: "TarefaAgendadaForm",
    props: ['data', 'errors'],
    data: () => ({
      loading: true,
      validForm: false,
      dataResponse: {} || this.data,
      errorData: {},
      rules: {
        required: [v => !!v || 'Campo obrigatório'],
      },
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
      ava: []
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
      await this.getAva();
      this.loading = false
    },
    methods: {
      async getAva() {
        return get('/ava?pagination=false&orderBy=tx_nome_ava').then(response => {
          this.ava = response.data.data;
        })
      }
    }
  }
</script>
