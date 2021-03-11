<template>
  <v-app>
    <v-layout>
      <v-container fluid>
        <v-row justify="start">
          <v-col cols="12" md="7" order="2" order-md="1">
            <v-col>
              <div class="region-text">
                <p>É para os <strong>servidores</strong>.<br> É para toda a <strong>sociedade</strong>.</p>
              </div>
            </v-col>
          </v-col>

          <v-col cols="12" md="3" order="1" order-md="2" align="center" class="form-login">
            <v-col>
              <h1><a href="/">Secretaria Virtual - Login</a></h1>
            </v-col>

            <v-form @submit.prevent="login()" ref="form" lazy-validation v-model="validForm" class="mb-8">
              <v-text-field
                v-model="username"
                :rules="rules.email"
                solo
                placeholder="Informe seu e-mail"
              />

              <v-text-field
                v-model="password"
                :rules="rules.required"
                solo
                type="password"
                placeholder="Informe sua senha"
              />

              <v-btn block large color="accent" :loading="loading" v-if="validForm" type="submit">
                Acessar
              </v-btn>

              <v-btn block large color="accent" :loading="loading" v-else disabled>
                Acessar
              </v-btn>

            </v-form>
            <a href="/">Voltar para o portal</a>
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
            this.loading = false;
            return;
          }

          await this.$store.dispatch('setAuthenticated', response.data.data).then(() => {
            this.$router.go(-1);
          });
          
          this.loading = false;
        }

      }
    }
  };
</script>

<style scoped>
  #app {
    background-color: var(--v-contrast-base);
    background-image: url(../assets/bg-login.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
  }
  a {
    color: var(--v-white-base);
  }
  h1 {
    margin-bottom: 2rem;
  }
  h1 a {
    background-image: url(../assets/logo-secretaria.svg);
    background-position: center 0;
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
    height: 60px;
    text-indent: -9000px;
  }
  .form-login {
    margin-top: 8rem;
  }
  .region-text {
    color: var(--v-white-base);
    font-size: 1.6rem;
    font-weight: 300;
    height: calc(100vh - 72px);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
  }
  .region-text strong {
    font-weight: 900;
  }

  @media screen and (max-width: 960px) {
    #app {
      background-image: url(../assets/bg-login-responsive.png);
    }
  }
</style>
