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
          <h2 class="featured pb-4">
            Cursos
            <strong>em Destaque</strong>
          </h2>

          <carousel-component
            @values="receiveCursos"
            @model="cursoIndex"
            :carousel-data="cursos"
            v-if="cursos.length"
            :perSlide="4"
          >
            <template v-slot:items>
              <list-cursos-cards :curso-data="slidesCursos[modelCurso]" />
            </template>
          </carousel-component>
        </v-layout>
      </v-flex>
    </v-container>

    <v-container class="mt-6 TODO-cursos-com-menos-detalhes">
      <v-flex align-center justify-center>
        <v-layout>
          <div class="pr-6 flex-grow-1">
            <h2 class="featured pb-4">
              Melhores Cursos
              <strong>do Dia</strong>
            </h2>

            <carousel-component
              @values="receiveCursosDia"
              @model="cursoDiaIndex"
              :carousel-data="cursosDia"
              v-if="cursosDia.length"
              :perSlide="4"
            >
              <template v-slot:items>
                <list-cursos-cards :curso-data="slidesCursosDia[modelCursoDia]" />
              </template>
            </carousel-component>
          </div>
          <div class="pl-6 flex-grow-1">
            <h2 class="featured pb-4">
              Melhores Cursos
              <strong>da Semana</strong>
            </h2>

            <carousel-component
              @values="receiveCursosSemana"
              @model="cursoSemanaIndex"
              :carousel-data="cursosSemana"
              v-if="cursosSemana.length"
              :perSlide="2"
            >
              <template v-slot:items>
                <list-cursos-cards :curso-data="slidesCursosSemana[modelCursoSemana]" />
              </template>
            </carousel-component>
          </div>
        </v-layout>
      </v-flex>
    </v-container>

    <v-container class="mt-6">
      <v-flex align-center justify-center>
        <v-layout column class="justify-center align-center">
          <h2 class="featured pb-4">
            Cursos <strong>Novos</strong>
          </h2>

          <carousel-component
            @values="receiveCursosNovos"
            @model="cursoNovosIndex"
            :carousel-data="cursosNovos"
            v-if="cursosNovos.length"
            :perSlide="4"
          >
            <template v-slot:items>
              <list-cursos-cards :curso-data="slidesCursosNovos[modelCursoNovos]" />
            </template>
          </carousel-component>

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
          <h2 class="featured pb-4">
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
    cursos: [],
    cursosDia: [],
    cursosSemana: [],
    cursosNovos: [],
    slidesCursos: [],
    slidesCursosDia: [],
    slidesCursosSemana: [],
    slidesCursosNovos: [],
    modelCurso: 0,
    modelCursoDia: 0,
    modelCursoSemana: 0,
    modelCursoNovos: 0,
    
  }),
  created() {
    this.getCursosDestaque();
    this.getProgramasDestaque();
    this.getMelhoresCursosDoDia();
    this.getMelhoresCursosDaSemana();
    this.getCursosNovos();
  },
  methods: {
    receiveCursos(data) {
      this.slidesCursos = data;
    },
    cursoIndex(index) {
      this.modelCurso = index;
    },
    receiveCursosDia(data) {
      this.slidesCursosDia = data;
    },
    cursoDiaIndex(index) {
      this.modelCursoDia = index;
    },
    receiveCursosSemana(data) {
      this.slidesCursosSemana = data;
    },
    cursoSemanaIndex(index) {
      this.modelCursoSemana = index;
    },
    receiveCursosNovos(data) {
      this.slidesCursosNovos = data;
    },
    cursoNovosIndex(index) {
      this.modelCursoNovos = index;
    },
    async getCursosDestaque() {
      const response = await get('/curso?search=bl_destaque_curso:1');
      this.cursos = response.data.data;
    },
    async getProgramasDestaque() {
      const response = await get('/programas?search=bl_programa_destaque:1');
      this.programas = response.data;
    },
    async getMelhoresCursosDoDia(){
      const response = await get('/inscricao/cursos-mais-acessados/dia');
      this.cursosDia = response.data.data;
    },
    async getMelhoresCursosDaSemana(){
      const response = await get('/inscricao/cursos-mais-acessados/semana');
      this.cursosSemana = response.data.data;
    },
    async getCursosNovos(){
      const response = await get('/curso?orderBy=created_at&sortedBy=desc&pagination=false');
      this.cursosNovos = response.data.data.filter((value) => (value.created_at != null)).filter((v, index) => (index < 8))
    }
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
  min-height: 500px;
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
<style>
.v-carousel,
.v-carousel__item {
  height: auto !important;
}
.TODO-cursos-com-menos-detalhes dl,
.TODO-cursos-com-menos-detalhes .v-card__actions {
  display: none;
}
</style>
