<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <v-card-title>Cursos</v-card-title>
      <v-card-subtitle>Acesse a listagem de cursos da EV.G.</v-card-subtitle>
    </v-card-text>

    <v-card-actions>
      <v-btn outlined @click="$router.push(`/cursos`)">
        <v-icon>mdi-format-list-bulleted-type</v-icon>  Lista
      </v-btn>
      <v-btn outlined @click="$router.push(`/curso/create`)">
        <v-icon>mdi-plus</v-icon>  Cadastro
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {}
}
</script>

<style scoped>
.v-card__actions {
    padding: 0 32px 32px;
}
.v-card__actions .v-icon {
  font-size: 16px;
  margin-right: 8px;
}
</style>