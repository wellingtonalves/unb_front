<template>
  <div>
    <h3>Comprovante de inscrição</h3>
    <p class="label">Código:</p>
    <p>{{data.nr_codigo_validador}}</p>
    <p class="label">Realizado por:</p>
    <p>{{data.pessoa.tx_nome_pessoa}}</p>
    <p class="label">Curso:</p>
    <p>{{data.oferta.curso.tx_nome_curso}}</p>
    <p class="label">Data da Inscrição:</p>
    <p>{{ data.dt_inscricao_formatada }}</p>

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