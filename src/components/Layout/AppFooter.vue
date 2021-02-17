<template>
  <v-footer :absolute="false" class="justify-center">

    <v-layout class="flex-column">

      <v-row>
        <v-col cols="12" lg="4" class="mr-8">
          <h2>EV.G | {{ $t('message.appFooter.portalUnico') }}</h2>
          <p class="subtitulo">{{ $t('message.appFooter.solucaoUnica') }}.</p>

          <v-btn
            v-for="icon in icons"
            :key="icon.id"
            class="mx-3 white--text"
            icon
            :href="icon.url"
          >
            <v-icon>{{ icon.icon }}</v-icon>
          </v-btn>
          
        </v-col>

        <v-col cols="12" lg="3">

          <h3>{{ $t('message.appFooter.sobreEscola') }}</h3>
          <v-list dense flat>
            <v-list-item href="/catalogo-cursos">
              <v-list-item-content>
                <v-list-item-title>{{ $t('message.appFooter.catalogoCursos') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/catalogo-programas">
              <v-list-item-content>
                <v-list-item-title>{{ $t('message.appFooter.catalogoProgramas') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/conheca-a-escola">
              <v-list-item-content>
                <v-list-item-title>{{ $t('message.appFooter.conhecaEscola') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/adesao-institucional">
              <v-list-item-content>
                <v-list-item-title>{{ $t('message.appFooter.adesaoInstitucional') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="https://www.escolavirtual.gov.br/instituicoes-participantes">
              <v-list-item-content>
                <v-list-item-title>{{ $t('message.appFooter.instituicoesParticipantes') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/politica-privacidade">
              <v-list-item-content>
                <v-list-item-title>{{ $t('message.appFooter.politicaPrivacidade') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
          </v-list>

        </v-col>

        <v-col cols="12" lg="3">

          <h3>{{ $t('message.appFooter.utilidades') }}</h3>
          <v-list dense flat>
            <v-list-item href="/validacao-documentos">
              <v-list-item-content>
                <v-list-item-title>{{ $t('message.appFooter.validacaoDocumentos') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/perguntas-frequentes">
              <v-list-item-content>
                <v-list-item-title>{{ $t('message.appFooter.perguntasFrequentes') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

        </v-col>

      </v-row>

      <v-row>
        <v-col cols="12">
          <a href="http://www.enap.gov.br/" id="link-enap">{{ $t('message.appFooter.organizadoPor') }} – Enap</a>
        </v-col>
      </v-row>
  
    </v-layout>

  </v-footer>
</template>

<script>
  import packageJson from "@/../package.json";
  export default {
    name: "AppFooter",
    data: () => ({
      environment: process.env.VUE_APP_AMBIENTE,
      version: packageJson.version,
      icons: [
        {id: 1,url: 'https://www.youtube.com/channel/UCksexEveRkoez2kiEjaKZxQ', icon: 'mdi-youtube'},
        {id: 2,url: 'https://twitter.com/enapgovbr', icon: 'mdi-twitter'},
        {id: 3,url: 'https://www.instagram.com/enapgovbr/', icon: 'mdi-instagram'},
        {id: 4,url: 'https://www.facebook.com/enapgovbr/', icon: 'mdi-facebook'},
      ],
    })
  }
</script>

<style scoped>
footer.v-footer {
  background-color: var(--v-lightgrey-base);
  margin-top: 64px;
  padding: 6px 0;
}
footer .layout {
  border-top: 5px solid var(--v-primary-base);
  padding-top: 24px;
}
footer h2 {
  color: var(--v-secondary-base);
  font-size: 115%;
  font-weight: 600;
  margin-bottom: 8px;
  padding-bottom: 0;
  text-transform: none;
}
footer .subtitulo {
  line-height: 1.4em;
}
footer h3 {
  color: var(--v-secondary-base);
  font-size: 90%;
  font-weight: 500;
  text-transform: uppercase;
}
footer .v-btn {
  color: var(--v-primary-base) !important;
}
footer .v-list {
  background-color: transparent;
}
footer.v-footer .v-list .v-list-item__content {
    padding: 4px 0;
}
footer.v-footer .v-list a.v-list-item {
  color: var(--v-primary-base) !important;
  min-height: auto;
  padding-left: 0;
  padding-right: 0;
}
footer.v-footer .v-list a.v-list-item:hover {
  text-decoration: underline;
}
#link-enap {
  border-top: 2px solid var(--v-mediumgrey-base);
  clear: both;
  display: inline-block;
  font-size: 85%;
  margin-top: 30px;
  padding-bottom: 0;
  padding-top: 20px;
  text-decoration: none;
  width: 100%;
}
#link-enap:hover {
  text-decoration: underline;
}
</style>
