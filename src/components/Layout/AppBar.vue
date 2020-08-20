<template>
  <v-app-bar app>
    <v-container>

    <v-row>

      <v-col class="align-self-start" cols="2">

        <h1><a href="/">EV.G: Escola Virtual.Gov</a></h1>

      </v-col>
      
<!--       <v-col cols="8">
        <v-list nav dense flat id="main-nav">

          <v-list-item link :to="'https://www.escolavirtual.gov.br/catalogo'">
            <v-list-item-content>
              <v-list-item-title>Catálogo</v-list-item-title>
              <v-list-item-subtitle>de Cursos</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="'https://www.escolavirtual.gov.br/programas'">
            <v-list-item-content>
              <v-list-item-title>Catálogo</v-list-item-title>
              <v-list-item-subtitle>de Programas</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="'https://www.escolavirtual.gov.br/conheca-a-escola'">
            <v-list-item-content>
              <v-list-item-title>Conheça</v-list-item-title>
              <v-list-item-subtitle>a Escola</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="'https://www.escolavirtual.gov.br/adesao-institucional'">
            <v-list-item-content>
              <v-list-item-title>Adesão </v-list-item-title>
              <v-list-item-subtitle>Institucional</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="'https://www.escolavirtual.gov.br/documentos/validacao'">
            <v-list-item-content>
              <v-list-item-title>Validação</v-list-item-title>
              <v-list-item-subtitle>de Documentos</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="'https://www.escolavirtual.gov.br/perguntas-frequentes'">
            <v-list-item-content>
              <v-list-item-title>Perguntas</v-list-item-title>
              <v-list-item-subtitle>Frequentes</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-col> -->

      <v-col class="d-flex justify-end" cols="10">

        <v-btn icon title="Notificações">
          <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-btn icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark" title="Modo Noturno">
          <v-icon v-if="$vuetify.theme.dark">mdi-invert-colors-off</v-icon>
          <v-icon v-else>mdi-invert-colors</v-icon>
        </v-btn>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">

            <v-btn text v-on="on" id="user-button">
              <v-icon size="25" color="secondary">mdi-account</v-icon>
              <div class="d-none d-md-flex align-center">
                <h6>{{ user.pessoa.tx_nome_pessoa }}</h6>
                <v-icon color="secondary">mdi-chevron-down</v-icon>
              </div>
            </v-btn>

          </template>

          <v-list nav dense>

            <v-divider/>

            <v-list-item link :to="'/cursos'">
              <v-list-item-icon>
                <v-icon>mdi-book-open-page-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Cursos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>

                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>

            <v-list-item @click="logout()">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Sair</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-col>

    </v-row>

    </v-container>
  </v-app-bar>
</template>

<script>
  import {logout} from '@/services/auth.service';
  
  export default {
    name: "AppBar",
    data: () => ({
      items: [
        {text: 'Meus dados', icon: 'mdi-home'},
        {text: 'Alterar e-mail', icon: 'mdi-email'},
        {text: 'Alterar senha', icon: 'mdi-lock'},
      ],
      user: JSON.parse(localStorage.getItem('user'))
    }),
    methods: {
      //TODO - fazer tratamento quando der erro no login api
      async logout() {
        const response = await logout();
        
        if (response.status === 200) {
          await this.$store.dispatch('logout').then(() => {
            this.$router.push('/');
          });
        }
      }
    }
  }
</script>

<style scoped>
  h1 a {
    background-image: url(../../assets/logo.svg);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
    height: 48px;
    text-indent: -9000px;
    width: 86px;
  }
  header.v-app-bar .container {
    padding-bottom: 0;
    padding-top: 0;
  }
  #user-button {
    margin-top: 6px;
  }
  #main-nav {
    background-color: transparent;
  }
  #main-nav a {
    color: var(--v-black-base);
    float: left;
    margin-right: 30px;
    text-transform: uppercase;
  }
  #main-nav .v-list-item__content {
    display: inline-block;
    position: relative;
  }
  #main-nav .v-list-item__content::after,
  #main-nav .v-list-item__content::before {
    background-color: var(--v-primary-base);
    content: "";
    height: 2px;
    min-height: 2px;
    opacity: 0;
    position: absolute;
    left: 0;
    width: 100%;
    -webkit-transition: opacity .3s,-webkit-transform .6s;
    -moz-transition: opacity .3s,-moz-transform .6s;
    transition: opacity .3s,transform .6s;
    -webkit-transform: translateY(10px);
    -moz-transform: translateY(10px);
    transform: translateY(10px);
  }
  #main-nav .v-list-item__content::after {
    bottom: 10px;
  }
  #main-nav .v-list-item__content::before {
    top: -10px;
  }
  #main-nav .v-list-item__content:hover::after,
  #main-nav .v-list-item__content:hover::before {
    opacity: 1;
  }
  #main-nav .v-list-item__subtitle {
    color: var(--v-primary-base);
    font-weight: 600;
  }
</style>
