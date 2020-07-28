<template>
  <v-app>
      <v-layout>
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="4" align="center">
              <v-col style="margin-bottom: 30px">
                <img src="@/assets/logo-secretaria.svg" height="60"/>  
              </v-col>
              

              <v-text-field solo placeholder="Digite seu e-mail ou CPF"/>

              <v-btn block large color="accent" style="margin-bottom: 30px"> ACESSAR</v-btn>
              <a href="/">Voltar ao portal</a>
            </v-col>
          </v-row>
        </v-container>
      </v-layout>
  </v-app>
</template>

<script>
  export default {
    name: 'Login',
  };

</script>

<style scoped>
  .layout {
    background-image: url('../assets/bg-login-responsive.png');
    /*TODO - FABIO - ajustar o tamanho da imagem pra ficar responsiva*/
    height: 100vh;
    background-size: cover;
  }
  
  a {
    color: white;
  }

</style>
