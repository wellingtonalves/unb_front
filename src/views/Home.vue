<template>
  <v-layout wrap>

    <v-row id="featured">
      <img
        src="https://www.enap.gov.br/media_files/images/noticias/2020/01/evg-50.jpg"
        alt="enap"
        style="width:100%;height: 400px"/>
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
            v-model="select"
            :search-input.sync="search"
            hide-details
            color="white"
            :items="filteredCursos"
            :loading="isLoading"
            item-text="tx_nome_curso"
            item-value="id_curso"
            prepend-inner-icon="mdi-feature-search-outline"
            style="background-color: white"
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
                <span style="color: white">Não encontramos nenhum curso com este nome.</span>
              </v-alert>
            </template>
            
            <template v-slot:item="{item}">
              
              <v-list-item-avatar>
                <v-img
                  v-if="item.tx_url_imagem_curso"
                  :src="item.tx_url_imagem_curso"
                />
              </v-list-item-avatar>
              
              <v-list-item-content @click="$router.push(`/curso/${item.id_curso}`)">
                <v-list-item-title v-text="item.tx_nome_curso" />
                <v-list-item-subtitle v-text="item.tematica_curso.tx_nome_tematica_curso" />
              </v-list-item-content>
              
            </template>
          </v-autocomplete>
        </v-card-text>
      </div>
    </v-row>

    <v-container>
      <v-flex align-center justify-center>
        <v-layout column class="justify-center align-center">
          <h2 class="featured">
            Cursos
            <strong>em Destaque</strong>
          </h2>

          <list-cursos-cards v-if="cursos.data" :curso-data="cursos.data"/>          

          <v-flex text-center>
            <v-btn color="primary" class="font-weight-bold" large outlined>
              Ver todos os cursos
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-container>
    
    <v-container>
      <v-flex align-center justify-center>
        <v-layout column class="justify-center align-center">
          <h2 class="featured mt-16">
            Programas
            <strong>em Destaque</strong>
          </h2>
          
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
      </v-flex>
    </v-container>

    <v-container>
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
          <v-card-title>
            ... pronto, você já está dentro do ambiente de curso.
          </v-card-title>
          <v-card-text>
            Lá você poderá ver também todos os cursos que você virá a se inscrever.
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
      cursos: {},
      programas: {},
      search: '',
      select: null,
      filteredCursos: [],
      isLoading: false,
    }),
    watch: {
      search(val) {
        return val !== this.select ? this.filterCursos(val) : '';
      },
    },
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
      async filterCursos(val) {
        this.isLoading = true;
        let items = await this.getCurso(val);
        setTimeout(() => {
          this.filteredCursos = items.filter(res => {
            return (
              (res.tx_nome_curso || '')
                .toLowerCase()
                .indexOf((val || '').toLowerCase()) > -1
            );
          });
          this.isLoading = false;
        }, 200);
      },
      async getCurso(val) {
        const response = await get(`/curso?search=tx_nome_curso:${val}`);
        return response.data ? response.data.data : [];
      },
    },
  };
</script>

<style scoped>
  #featured {
    margin-top: -60px;
    position: relative;
  }

  /* Centered text */
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
