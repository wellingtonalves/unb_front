<template>
  <div>
    <h3 class="mb-2">Comprovante de certificado</h3>

    <dl class="description-list mb-2">
      <dt>Código do Certificado:</dt>
      <dd>{{data.nr_codigo_validador}}</dd>
      <dt>Concedido a:</dt>
      <dd>{{data.tx_nome_pessoa}}</dd>
      <dt>Curso:</dt>
      <dd>{{data.inscricao.oferta.curso.tx_nome_curso}}</dd>
      <dt>Na data:</dt>
      <dd>{{data.dt_emissao_certificado_formatada}}</dd>
    </dl>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            ATIVIDADE AVALIATIVA
          </th>
          <th class="text-center">
            NOTA
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="item in data.inscricao.avaliacao_inscrito"
          :key="item.id"
        >
          <td>{{item.avaliacao.tx_nome_avaliacao}}</td>
          <td class="text-center">{{item.qt_nota}}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-row class="mt-2">
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