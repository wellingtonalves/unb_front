<template>
  <v-layout wrap>
    <v-layout id="featured">
      <div class="centered">
        <h2 class="white--text text-center">Escola Virtual.Gov – EV.G</h2>
        <h3
          class="font-weight-light white--text text-center"
        >Portal Único de Governo para a oferta de capacitação a distância.</h3>
        <p class="font-weight-light white--text text-center">
          Cursos on-line e gratuitos de várias áreas de conhecimento para o
          desenvolvimento da Administração Pública e da Sociedade.
        </p>
        <search-curso />
      </div>
    </v-layout>

    <v-container class="mt-6">
      <v-flex align-center justify-center>
        <v-layout column class="justify-center align-center">
          <h2 class="featured">
            Cursos
            <strong>em Destaque</strong>
          </h2>

          <v-carousel hide-delimiters v-model="cursoModel" interval="6000" cycle>
            <v-carousel-item v-for="index in arrCount" :key="index">
              <v-responsive dark>
                <v-row no-gutters justify="space-around">
                  <v-col class="d-flex justify-center">
                    <div class="desktop-scroll scroll">
                      <div class="content-desktop">
                        <v-row>
                          <v-col>
                            <list-cursos-cards
                              v-if="carouselItems.length"
                              :curso-data="carouselItems[cursoModel]"
                            />
                          </v-col>
                        </v-row>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-responsive>
            </v-carousel-item>
          </v-carousel>

          <v-flex text-center class="mt-6">
            <v-btn large outlined color="primary" @click="$router.push('/catalogo-cursos')">
              Ver todos os cursos
              <v-icon right>mdi-menu-right</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-container>

    <v-container class="mt-6">
      <v-flex align-center justify-center>
        <v-layout column class="justify-center align-center">
          <h2 class="featured">
            Programas
            <strong>em Destaque</strong>
          </h2>

          <list-programas-cards v-if="programas.data" :programa-data="programas.data" />

          <v-flex text-center class="mt-6">
            <v-btn large outlined color="primary" @click="$router.push('/catalogo-programas')">
              Ver todos os programas
              <v-icon right>mdi-menu-right</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-container>

    <v-container class="mt-6">
      <h2 class="featured">
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
          <v-card-title>... pronto, você já está dentro do ambiente de curso.</v-card-title>
          <v-card-text>
            Lá você poderá ver também todos os cursos que você virá a se
            inscrever.
          </v-card-text>
          <v-img src="../assets/img/como-funciona-04.svg" alt="Passo 04"></v-img>
        </v-card>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import {get} from '@/services/abstract.service';

export default {
  name: 'Home',
  data: () => ({
    programas: {},
    carouselItems: [],
    arrCount: [],
    cursoModel: 0,
  }),
  created() {
    this.getCursosDestaque();
    this.getProgramasDestaque();
  },
  methods: {
    countSlides(arr) {
      this.arrCount = Array.from({length: arr.length}, (_, i) => i + 1);
    },
    chunkCarousel(array, chunkSize) {
      let chunkCount = Math.ceil(array.length / chunkSize);
      let chunks = new Array(chunkCount);
      for (let i = 0, j = 0, k = chunkSize; i < chunkCount; ++i) {
        chunks[i] = array.slice(j, k);
        j = k;
        k += chunkSize;
      }
      return chunks;
    },
    async getCursosDestaque() {
      const response = await get('/curso?search=bl_destaque_curso:1');
      this.carouselItems = this.chunkCarousel(response.data.data, 4);
      this.countSlides(this.carouselItems);
    },
    async getProgramasDestaque() {
      const response = await get('/programas?search=bl_programa_destaque:1');
      this.programas = response.data;
    },
  },
};
</script>

<style scoped>
#featured {
  background-attachment: fixed;
  background-image: url(../assets/img/bg-index.jpg);
  background-position: center center;
  background-size: cover;
  display: inline-block;
  margin-top: -80px;
  min-height: 500px;
  padding-top: 100px;
  padding-bottom: 100px;
  position: relative;
  width: 100%;
}

#featured h2 {
  font-size: 2.25rem;
  padding-bottom: 4px;
  text-transform: none;
}

#featured h3 {
  font-size: 1rem;
  padding-bottom: 24px;
}

#featured p {
  font-size: 1.25rem;
}

#featured .centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 600px) {
  #featured .centered {
    padding-left: 12px;
    padding-right: 12px;
    position: static;
    transform: none;
  }
}
</style>
