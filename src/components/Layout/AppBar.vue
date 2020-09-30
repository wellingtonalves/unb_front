<template>

  <div>
    
    <v-navigation-drawer
      v-model="drawerSettings.model"
      :clipped="true"
      :mini-variant="false"
      app
      overflow
      width="300px"
    >

      <v-list dense>
        <v-list-item link :to="'/'">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="'/cursos/'" v-show="permission('CURSO_LISTAR')">
          <v-list-item-action>
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Curso</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="'/ava/'" v-show="permission('APOIO_UPLOAD')">
          <v-list-item-action>
            <v-icon>mdi-school-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>AVA</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group prepend-icon="mdi-account-settings" value="true" v-show="(permission('USUARIO_PESQUISAR') || permission('PERFIL_PESQUISAR'))">

          <template v-slot:activator>
            <v-list-item-title>Controle de acessos</v-list-item-title>
          </template>

          <v-list-item link :to="'/usuario'" v-show="permission('USUARIO_PESQUISAR')">
            <v-list-item-action style="padding-left: 14px;">
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Usuários</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="'/perfil'" v-show="permission('PERFIL_PESQUISAR')">
            <v-list-item-action style="padding-left: 14px;">
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Perfis</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list-group>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar :clipped-left="true" app>
      <v-app-bar-nav-icon @click.stop="drawerSettings.model = !drawerSettings.model"/>
      <v-container>

        <v-row>

          <v-col class="align-self-start" cols="2">

            <h1><a href="https://www.escolavirtual.gov.br/" target="_blank">EV.G: Escola Virtual.Gov</a></h1>

          </v-col>

          <v-col cols="8">

            <v-list nav dense flat id="main-nav">

              <v-list-item href="https://www.escolavirtual.gov.br/catalogo">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appBar.catalogoCursos.title') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('message.appBar.catalogoCursos.subtitle') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item href="https://www.escolavirtual.gov.br/programas">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appBar.catalogoProgramas.title') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('message.appBar.catalogoProgramas.subtitle') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item href="https://www.escolavirtual.gov.br/conheca-a-escola">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appBar.conhecaEscola.title') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('message.appBar.conhecaEscola.subtitle') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item href="https://www.escolavirtual.gov.br/adesao-institucional">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appBar.adesaoInstitucional.title') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('message.appBar.adesaoInstitucional.subtitle') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item href="https://www.escolavirtual.gov.br/validacao">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appBar.validacaoDocumentos.title') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('message.appBar.validacaoDocumentos.subtitle') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

            </v-list>
          </v-col>

          <v-col class="d-flex justify-end align-center" cols="2">

            <v-btn icon  title="Modo Noturno" @click="switchLocale()">
              <v-img
                v-if="this.$i18n.locale === 'pt'"
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="@/assets/img/br-flag.png"
                transition="scale-transition"
                width="30"
              />

              <v-img
                v-else
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="@/assets/img/us-flag.png"
                transition="scale-transition"
                width="30"
              />
            </v-btn>


            <v-btn icon title="Notificações">
              <v-icon>mdi-bell</v-icon>
            </v-btn>

            <v-btn icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark" title="Modo Noturno">
              <v-icon v-if="$vuetify.theme.dark">mdi-invert-colors-off</v-icon>
              <v-icon v-else>mdi-invert-colors</v-icon>
            </v-btn>

            <v-menu offset-y>
              <template v-slot:activator="{ on }">

                <v-btn text v-on="on">
                  <v-icon size="25" color="secondary">mdi-account</v-icon>
                  <div class="d-none d-md-flex align-center">
                    <h6>{{ user.pessoa.tx_nome_pessoa }}</h6>
                    <v-icon color="secondary">mdi-chevron-down</v-icon>
                  </div>
                </v-btn>

              </template>

              <v-list nav dense>

                <v-list-item v-for="(item, i) in dropdownMenu" :key="i">
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
    
  </div>
  
</template>

<script>
  import {logout} from '@/services/auth.service';
  import {checkPermission} from "@/helpers/checkPermission";
  
  export default {
    name: "AppBar",
    data: () => ({
      drawerSettings: {
        model: null,
        clipped: true,
      },
      dropdownMenu: [
        {text: 'Meus dados', icon: 'mdi-home'},
        {text: 'Alterar e-mail', icon: 'mdi-email'},
        {text: 'Alterar senha', icon: 'mdi-lock'},
      ],
      user: JSON.parse(localStorage.getItem('user'))
    }),
    methods: {
      permission(rule) {
        return checkPermission(rule);
      },
      //TODO - fazer tratamento quando der erro no login api
      async logout() {
        const response = await logout();
        
        if (response.status === 200) {
          await this.$store.dispatch('logout').then(() => {
            this.$router.push('/login');
          });
        }
      },
      switchLocale() {
        this.$i18n.locale === 'pt' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'pt';
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
    height: 62px;
    text-indent: -9000px;
    width: 112px;
  }
  header.v-app-bar {
    height: auto !important;
  }
  header.v-app-bar .container {
    padding-bottom: 0;
    padding-top: 0;
  }
  nav.v-navigation-drawer {
    top: 94px !important;
  }
  #main-nav {
    background-color: transparent;
  }
  #main-nav a {
    color: var(--v-black-base);
    float: left;
    margin-right: 20px;
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
    opacity: .25;
  }
  #main-nav .v-list-item__subtitle {
    color: var(--v-primary-base);
    font-weight: 600;
  }
</style>
