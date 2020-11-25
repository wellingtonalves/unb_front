<template>
  <div>
    <v-dialog v-model="value" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>
        <v-card-text>Deseja excluir o registro <strong>{{ text }}</strong> ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="excluir()">Confirmar</v-btn>
          <v-btn color="error" text @click="() => this.$emit('input', false)">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogDeleteComponent",
  props: ['value', 'text'],
  methods: {
    excluir() {
      this.$emit('excluir')
    }
  }
}
</script>

<style scoped>

</style>