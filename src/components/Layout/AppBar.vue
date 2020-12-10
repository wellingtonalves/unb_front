<template>

  <v-layout>
    <v-navigation-drawer
      v-if="isAuthenticated === true"
      v-model="menu.model"
      :clipped="true"
      :mini-variant="false"
      app
      overflow
      width="300px"
    >

      <v-list dense>
        <v-list-item link :to="'/dashboard'">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="'/cursos'" v-show="permission('CURSO_LISTAR')">
          <v-list-item-action>
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cursos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="'/ofertas'" v-show="permission('OFERTA_LISTAR')">
          <v-list-item-action>
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Ofertas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="'/ava'" v-show="permission('AVA_LISTAR')">
          <v-list-item-action>
            <v-icon>mdi-school-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>AVA</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="'/tarefas-agendadas'" v-show="permission('TAREFA_AGENDADA_LISTAR')">
          <v-list-item-action>
            <v-icon>mdi-briefcase-clock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tarefas agendadas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="'/programas'" v-show="permission('PROGRAMA_LISTAR')">
          <v-list-item-action>
            <v-icon>mdi-school-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Programas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          prepend-icon="mdi-account-settings"
          value="true"
          v-show="(permission('USUARIO_LISTAR') || permission('PERFIL_LISTAR'))"
        >
          <template v-slot:activator>
            <v-list-item-title>Controle de acessos</v-list-item-title>
          </template>

          <v-list-item link :to="'/usuarios'" v-show="permission('USUARIO_LISTAR')">
            <v-list-item-action>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Usuários</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="'/perfis'" v-show="permission('PERFIL_LISTAR')">
            <v-list-item-action>
              <v-icon>mdi-account-box-multiple</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Perfis</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="'/permissoes'" v-show="permission('PERMISSAO_LISTAR')">
            <v-list-item-action>
              <v-icon>mdi-account-details</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Permissões</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item link :to="'/certificados'" v-show="permission('CERTIFICADO_LISTAR')">
          <v-list-item-action>
            <v-icon>mdi-school-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Certificados</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="true" app>
      <v-app-bar-nav-icon v-if="isAuthenticated === true" @click.stop="changeDrawer()"/>

      <v-container fluid>
        <v-row>
          <v-col cols="9" class="align-self-start">
            <h1 class="mr-8 float-left">
              <a @click="home()">EV.G: Escola Virtual.Gov</a>
            </h1>
            <v-list nav dense flat id="main-nav" class="d-none d-sm-flex float-left">
              <v-list-item href="https://www.escolavirtual.gov.br/catalogo">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appBar.catalogoCursos.title') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('message.appBar.catalogoCursos.subtitle') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item to="/catalogo-programas">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appBar.catalogoProgramas.title') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('message.appBar.catalogoProgramas.subtitle') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item to="/conheca-a-escola">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appBar.conhecaEscola.title') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('message.appBar.conhecaEscola.subtitle') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item to="/adesao-institucional">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appBar.adesaoInstitucional.title') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('message.appBar.adesaoInstitucional.subtitle') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item href="https://www.escolavirtual.gov.br/documentos/validacao">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appBar.validacaoDocumentos.title') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('message.appBar.validacaoDocumentos.subtitle') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item to="/perguntas-frequentes">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appBar.perguntasFrequentes.title') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('message.appBar.perguntasFrequentes.subtitle') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

            </v-list>
          </v-col>

          <v-col cols="3" class="d-flex justify-end align-center">

            <v-btn icon title="Alterar idioma" class="top-button" @click="switchLocale()">
              <v-img
                v-if="this.$i18n.locale === 'pt'"
                alt="Idioma Português Brasileiro"
                class="shrink"
                contain
                src="@/assets/img/br-flag.png"
                transition="scale-transition"
                width="24"
              />

              <v-img
                v-else
                alt="Idioma Inglês (EUA)"
                class="shrink"
                contain
                src="@/assets/img/us-flag.png"
                transition="scale-transition"
                width="24"
              />
            </v-btn>

            <v-btn
              icon
              title="Modo Noturno"
              class="top-button"
              @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
            >
              <v-icon v-if="$vuetify.theme.dark">mdi-invert-colors-off</v-icon>
              <v-icon v-else>mdi-invert-colors</v-icon>
            </v-btn>

            <v-btn icon title="Notificações" class="top-button" v-if="isAuthenticated === true">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
            
            <v-btn tile color="contrast" @click="login()" class="my-2 ml-2 white--text" v-if="isAuthenticated === false">
              Entrar
              <v-icon right>
                mdi-menu-right
              </v-icon>
            </v-btn>

            <v-menu offset-y v-if="isAuthenticated === true">
              <template v-slot:activator="{ on }">

                <v-btn text v-on="on">
                  <v-icon size="25" color="secondary">mdi-account</v-icon>
                  <div class="d-none d-md-flex align-center">
                    <h6>{{ user.pessoa.tx_nome_pessoa }}</h6>
                    <v-icon color="secondary">mdi-chevron-down</v-icon>
                  </div>
                </v-btn>

              </template>

              <v-list nav dense id="menu-meus-dados">
                <v-list-item
                  v-for="(item, i) in dropdownMenu"
                  :key="i"
                  @click="toRedirect(item.to)"
                >
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

  </v-layout>

</template>

<script>
import {checkPermission} from "@/helpers/checkPermission";
import {mapGetters} from "vuex";
import {logout} from "@/services/auth.service";

export default {
  name: 'AppBar',
  data: () => ({
    dropdownMenu: [
      {text: 'Meus dados', icon: 'mdi-home', to: 'meus-dados'},
      {
        text: 'Alterar e-mail',
        icon: 'mdi-email',
        to: 'meus-dados/alterar-email',
      },
      {
        text: 'Alterar senha',
        icon: 'mdi-lock',
        to: 'meus-dados/alterar-senha',
      },
    ],
  }),
  watch: {
    '$route': function (route){
      if (route.meta.requiresAuth === false) {
        this.$store.dispatch('setMenuDrawer', {...this.menu, model: false})
      }
    }
  },
  methods: {
    permission(rule) {
      return checkPermission(rule);
    },
    switchLocale() {
      this.$i18n.locale === 'pt' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'pt';
    },
    toRedirect(path) {
      this.$router.push(`/${path}`);
    },
    async logout() {
      const response = await logout();

      if (response.status === 200) {
        await this.$store.dispatch('logout').then(() => {
          this.$router.push('/');
        });
      }
    },
    login() {
      this.$router.push('/login');
    },
    home() {
      if (this.$router.history.current.path === '/') {
        return false;
      }
      this.$router.push('/');
    },
    changeDrawer() {
      this.$store.dispatch('setMenuDrawer', {...this.menu, model: !this.menu.model})
    },
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user', 'menu'])
  },
}
</script>

<style>
nav.v-navigation-drawer .v-list-item__action,
nav.v-navigation-drawer .v-list-item__icon {
  margin: 8px 0;
  margin-right: 8px !important;
}

nav.v-navigation-drawer .v-list-item__action .v-icon.v-icon,
nav.v-navigation-drawer .v-list-group .v-list-item__action .v-icon.v-icon {
  font-size: 18px;
}

nav.v-navigation-drawer .v-list-group__items .v-list-item {
  padding: 0 32px;
}
</style>

<style scoped>
header.v-app-bar {
  background-color: var(--v-white-base) !important;
  box-shadow: 0 0 10px 0 rgba(55, 71, 79, .1) !important;
  height: auto !important;
}

header.v-app-bar .container {
  padding: 0 48px;
}

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

header.v-app-bar button.v-app-bar__nav-icon {
  margin-left: 0 !important;
  opacity: 0.75;
  position: absolute;
}

nav.v-navigation-drawer {
  top: 86px !important;
}

nav.v-navigation-drawer .v-list > .v-list-item:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

nav.v-navigation-drawer .v-list-item__title {
  font-size: .85rem;
}

#main-nav {
  background-color: transparent;
  padding-top: 4px;
  padding-bottom: 4px;
}

#main-nav a {
  color: var(--v-black-base);
  float: left;
  margin-right: 32px;
  padding: 0;
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
  -webkit-transition: opacity .3s, -webkit-transform .6s;
  -moz-transition: opacity .3s, -moz-transform .6s;
  transition: opacity .3s, transform .6s;
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

#main-nav .v-list-item__title {
  font-weight: 300;
}

#main-nav .v-list-item__subtitle {
  color: var(--v-primary-base);
  font-weight: 600;
}

#menu-meus-dados .v-list-item .v-list-item__icon {
  margin-right: 8px;
}

#menu-meus-dados .v-list-item .v-list-item__icon .v-icon.v-icon {
  font-size: 20px;
}

.top-button {
  height: 40px !important;
  width: 40px !important;
}

@media (max-width: 600px) {
  header.v-app-bar .container {
    padding: 0;
  }

  h1 {
    margin-left: 40px;
  }

  h1 a {
    height: 44px;
    width: 80px;
  }

  nav.v-navigation-drawer {
    top: 76px !important;
  }
}
</style>

