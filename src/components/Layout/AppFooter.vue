<template>
  <v-footer app absolute="false" class="justify-center">

    <v-container>
      <v-layout class="flex-column">

        <v-row>
          <v-col cols="4">
            <h2>EV.G | {{ $t('message.appFooter.portalUnico') }}</h2>
            <p class="subtitulo">{{ $t('message.appFooter.solucaoUnica') }}.</p>

            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-3 white--text"
              icon
              :href="icon.url"
            >
              <v-icon>{{ icon.icon }}</v-icon>
            </v-btn>
            
          </v-col>

          <v-col cols="3">

            <h3>{{ $t('message.appFooter.sobreEscola') }}</h3>
            <v-list dense flat>
              <v-list-item href="https://www.escolavirtual.gov.br/catalogo">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appFooter.catalogoCursos') }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item href="https://www.escolavirtual.gov.br/programas">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appFooter.catalogoProgramas') }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item href="https://www.escolavirtual.gov.br/conheca-a-escola">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appFooter.conhecaEscola') }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item href="https://www.escolavirtual.gov.br/adesao-institucional">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appFooter.adesaoInstitucional') }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item href="https://www.escolavirtual.gov.br/instituicoes-participantes">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appFooter.instituicaoParticipante') }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item href="https://www.escolavirtual.gov.br/politica-privacidade">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appFooter.politicaPrivacidade') }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
            </v-list>

          </v-col>

          <v-col cols="3">

            <h3>{{ $t('message.appFooter.utilidades') }}</h3>
            <v-list dense flat>
              <v-list-item href="https://www.escolavirtual.gov.br/documentos/validacao">
                <v-list-item-content>
                  <v-list-item-title>{{ $t('message.appFooter.validacaoDocumentos') }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item href="https://www.escolavirtual.gov.br/perguntas-frequentes">
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
    </v-container>

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
        {url: 'https://www.youtube.com/channel/UCksexEveRkoez2kiEjaKZxQ', icon: 'mdi-youtube'},
        {url: 'https://twitter.com/enapgovbr', icon: 'mdi-twitter'},
        {url: 'https://www.instagram.com/enapgovbr/', icon: 'mdi-instagram'},
        {url: 'https://www.facebook.com/enapgovbr/', icon: 'mdi-facebook'},
      ],
    })
  }
</script>

<style scoped>
footer.v-footer {
  background-color: var(--v-lightgrey-base);
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
