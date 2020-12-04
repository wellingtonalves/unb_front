<template>
  <v-layout wrap>
    <v-row>
      <div class="container">
        <img
          src="https://www.enap.gov.br/media_files/images/noticias/2020/01/evg-50.jpg"
          alt="enap"
          style="width:100%;height: 400px"
        />
        <div class="centered">
          <h2 class="white--text">Escola Virtual.Gov – EV.G</h2>
          <h4 class="font-weight-regular white--text">
            Portal Único de Governo para a oferta de capacitação a distância.
          </h4>
          <p class="font-weight-bold headline white--text">
            Cursos on-line e gratuitos de várias áreas de conhecimento para o
            desenvolvimento da Administração Pública e da Sociedade.
          </p>
          <v-card-text>
            <v-autocomplete
              class="mx-4"
              flat
              v-model="search"
              hide-details
              color="white"
              style="background-color: white"
              prepend-inner-icon="mdi-feature-search-outline"
              label="Busque um curso"
              solo-inverted
              clearable
            >
              <template v-slot:no-data>
                <v-alert
                  :value="true"
                  color="error"
                  icon="fas fa-exclamation-triangle"
                >
                  <span style="color: white"
                    >Não encontramos nenhum curso com este nome.</span
                  >
                </v-alert>
              </template>
            </v-autocomplete>
          </v-card-text>
        </div>
      </div>
    </v-row>
    <v-row>
      <h2 class="featured">
        Cursos
        <strong>em Destaque</strong>
      </h2>

      <v-layout class="cards course-cards flex-wrap justify-center">
        <list-cursos-cards v-if="cursos.data" :curso-data="cursos.data" />
      </v-layout>
      <v-flex text-center>
        <v-btn color="primary" class="font-weight-bold" large outlined>
          Ver todos os cursos
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-flex>
    </v-row>
    <v-row>
      <h2 class="featured mt-16">
        Programas
        <strong>em Destaque</strong>
      </h2>

      <v-layout class="cards course-cards flex-wrap justify-center">
        <list-programas-cards
          v-if="programas.data"
          :programa-data="programas.data"
        />
        <v-flex text-center>
          <v-btn
            color="primary"
            @click="$router.push('/catalogo-programas')"
            class="font-weight-bold"
            large
            outlined
          >
            Ver todos os programas
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-row>

    <h2 class="featured mt-16">
      Como a escola
      <strong>funciona</strong>
    </h2>

    <v-layout class="evg-cards count-items flex-wrap justify-center">
      <v-card class="d-flex">
        <v-card-title>
          Escolha um curso pelo
          <strong>Catálogo de Cursos</strong> ou pela sugestão da página
          inicial.
        </v-card-title>
        <v-img src="../assets/img/como-funciona-01.svg" alt="Passo 01"></v-img>
      </v-card>

      <v-card class="d-flex">
        <v-card-title>
          Leia a descrição do curso e acesse o link
          <strong>Inscreva-se</strong>.
        </v-card-title>
        <v-img src="../assets/img/como-funciona-02.svg" alt="Passo 02"></v-img>
      </v-card>

      <v-card class="d-flex">
        <v-card-title>Acompanhe as instruções de cadastro e...</v-card-title>
        <v-img src="../assets/img/como-funciona-03.svg" alt="Passo 03"></v-img>
      </v-card>

      <v-card class="d-flex">
        <v-card-title
          >... pronto, você já está dentro do ambiente de curso.</v-card-title
        >
        <v-card-text
          >Lá você poderá ver também todos os cursos que você virá a se
          inscrever.</v-card-text
        >
        <v-img src="../assets/img/como-funciona-04.svg" alt="Passo 04"></v-img>
      </v-card>
    </v-layout>
  </v-layout>
</template>

<script>
import {get} from '@/services/abstract.service';
export default {
  name: 'Home',
  data: () => ({
    cursos: {},
    programas: {},
    search: '',
  }),
  created() {
    this.getCursosDestaque();
    this.getProgramasDestaque();
  },
  methods: {
    async getCursosDestaque() {
      const response = await get('/curso?search=bl_destaque_curso:1');
      this.cursos = response.data;
    },
    async getProgramasDestaque() {
      const response = await get('/programas?search=bl_programa_destaque:1');
      this.programas = response.data;
    },
  },
};
</script>

<style scoped>
.container {
  clear: both;
  margin: 0 auto;
  width: 100%;
  position: relative;
  text-align: center;
}
/* Centered text */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
