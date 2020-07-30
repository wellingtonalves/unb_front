<template>
  <v-app>
    <v-layout>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="4" align="center">
            <v-col style="margin-bottom: 30px">
              <img src="@/assets/logo-secretaria.svg" height="60"/>
            </v-col>

            <v-form ref="form" lazy-validation v-model="validForm">
              <v-text-field
                v-model="username"
                :rules="rules.email"
                solo
                placeholder="Digite seu e-mail"
              />


              <v-text-field
                v-model="password"
                :rules="rules.required"
                solo
                type="password"
                placeholder="Digite sua senha"
              />

              <v-btn block large color="accent" :loading="loading" v-if="validForm" style="margin-bottom: 30px" @click="login()">
                ACESSAR
              </v-btn>

              <v-btn block large color="accent" :loading="loading" v-else disabled style="margin-bottom: 30px">
                ACESSAR
              </v-btn>

            </v-form>
            <a href="/">Voltar ao portal</a>
          </v-col>
        </v-row>
      </v-container>

      <v-snackbar v-model="snackbar.active" :color="snackbar.color">
        {{snackbar.text}}
        <v-btn text @click="snackbar.active = false">
          Fechar
        </v-btn>
      </v-snackbar>

    </v-layout>
  </v-app>
</template>

<script>

  import {login} from '@/services/auth.service';

  export default {
    name: 'Login',
    data: () => ({
      username: '',
      password: '',
      loading: false,
      validForm: false,
      rules: {
        required: [v => !!v || 'Campo obrigatório'],
        email: [
          v => !!v || 'Campo obrigatório',
          v => /.+@.+\..+/.test(v) || 'E-mail inválido.',
          v => (v || '').indexOf(' ') < 0 || 'E-mail inválido.'
        ],
      },
      snackbar: {
        active: false,
        color: '',
        text: '',
      },
    }),
    methods: {
      async login() {

        if (this.$refs.form.validate()) {
          this.loading = true;
          let response = await login(this.username, this.password);

          if (response.status !== 200) {
            this.snackbar.text = response.data.message;
            this.snackbar.color = response.data.messageType;
            this.snackbar.active = true;
            return;
          }

          await this.$store.dispatch('setAuthenticated', response.data.data).then(() => {
            this.$router.push('/');
          });
          
          this.loading = false;
        }

      }
    }
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
