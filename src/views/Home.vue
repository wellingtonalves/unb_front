<template>
  <v-layout wrap>

    <h3>Como Funciona</h3>

    <v-layout class="evg-cards count-items flex-wrap">

      <v-card class="d-flex">
        <v-card-title>Escolha um curso pelo <strong>Catálogo de Cursos</strong> ou pela sugestão da página inicial.</v-card-title>
        <v-img src="../assets/img/como-funciona-01.svg" alt="Passo 01"></v-img>
      </v-card>

      <v-card class="d-flex">
        <v-card-title>Leia a descrição do curso e acesse o link <strong>Inscreva-se</strong>.</v-card-title>
        <v-img src="../assets/img/como-funciona-02.svg" alt="Passo 02"></v-img>
      </v-card>

      <v-card class="d-flex">
        <v-card-title>Acompanhe as instruções de cadastro e...</v-card-title>
        <v-img src="../assets/img/como-funciona-03.svg" alt="Passo 03"></v-img>
      </v-card>

      <v-card class="d-flex">
        <v-card-title>... pronto, você já está dentro do ambiente de curso.</v-card-title>
        <v-card-text>Lá você poderá ver também todos os cursos que você virá a se inscrever.</v-card-text>
        <v-img src="../assets/img/como-funciona-04.svg" alt="Passo 04"></v-img>
      </v-card>

    </v-layout>

  </v-layout>
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