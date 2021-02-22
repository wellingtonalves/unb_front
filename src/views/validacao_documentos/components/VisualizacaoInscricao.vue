<template>
  <div>
    <h3 class="mb-2">Comprovante de Inscrição</h3>

    <dl class="description-list">
      <dt>Código:</dt>
      <dd>{{data.nr_codigo_validador}}</dd>
      <dt>Realizado por:</dt>
      <dd>{{data.pessoa.tx_nome_pessoa}}</dd>
      <dt>Curso:</dt>
      <dd>{{data.oferta.curso.tx_nome_curso}}</dd>
      <dt>Data da Inscrição:</dt>
      <dd>{{ data.dt_inscricao_formatada }}</dd>
    </dl>

    <v-row>
      <v-col>
        <v-btn large color="primary" @click="print()">
          Imprimir
        </v-btn>
        <v-btn class="ml-2" @click="$emit('close')">
          Voltar
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Visualizacao",
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  methods:{
    print(){
      window.print();
    }
  }
}
</script>

<style scoped>

</style>