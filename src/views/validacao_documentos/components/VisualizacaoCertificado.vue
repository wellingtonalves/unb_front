<template>
  <div>
    <h3>Comprovante de certificado</h3>
    <p class="label">Código do Certificado:</p>
    <p>{{data.nr_codigo_validador}}</p>
    <p class="label">Concedido a:</p>
    <p>{{data.tx_nome_pessoa}}</p>
    <p class="label">Curso:</p>
    <p>{{data.inscricao.oferta.curso.tx_nome_curso}}</p>
    <p class="label">Na data:</p>
    <p>{{data.dt_emissao_certificado_formatada}}</p>
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
    <v-row>
      <v-col>
        <v-btn large color="accent" @click="print()">
          Imprimir
        </v-btn>
        <v-btn class="ml-2" large color="accent" @click="$emit('close')">
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