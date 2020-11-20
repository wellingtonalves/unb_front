<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Filtros
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-form ref="form" lazy-validation>
          <v-row>

            <slot name="filterExpansionPanel"></slot>

            <v-col class="d-flex" cols="12" sm="4">
              <v-btn dark outlined rounded color="primary" class="mr-5" @click="filtrar()">
                <v-icon>mdi-magnify</v-icon>
                Pesquisar
              </v-btn>
              <v-btn dark outlined rounded color="primary" @click="resetar()">
                <v-icon>mdi-magnify-close</v-icon>
                Limpar
              </v-btn>
            </v-col>

          </v-row>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "FilterExpansionPanel",
  methods: {
    filtrar() {
      this.$emit('filtrar');
    },
    resetar() {
      this.$emit('resetar');
    }
  }
}
</script>

<style scoped>

</style>
