<template>
  <v-layout wrap>
    <v-row v-if="!loading && programa">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="6" lg="5" class="headline white--text">
            <small class="headline blue-grey--text text--darken-3">{{
              'PROGRAMA'
            }}</small>
            <h3 class="font-weight-black blue-grey--text text--darken-3">
              {{ programa.tx_nome_programa }}
            </h3>
            <v-card-text
              class="font-weight-medium blue-grey--text text--darken-3"
              >{{ programa.tx_apresentacao }}</v-card-text
            >
          </v-col>
          <v-col cols="5">
            <v-card-text style="position: relative">
              <v-img
                max-width="500"
                max-height="325"
                :src="programa.tx_url_imagem"
              ></v-img>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-row v-if="!loading && programa">
      <v-flex xs12 sm8 offset-sm2 align-center justify-center>
        <v-layout column class="justify-center align-center">
          <v-row class="section" align="center" justify="center">
            <div class="box">
              <h4>INFORMAÇÕES GERAIS</h4>
              <v-layout class="flex-wrap">
                <div>
                  <h5>PÚBLICO ALVO</h5>
                  <p>
                    {{ programa.tx_publico_alvo }}
                  </p>
                </div>
                <div>
                  <h5>CARGA HORÁRIA</h5>
                  <p>
                    {{ `${programa.qt_carga_horaria}h` }}
                  </p>
                </div>
                <div>
                  <h5>CRITÉRIOS PARA OBTENÇÃO DO CERTIFICADO</h5>
                  <p>
                    {{ displayCriterio(programa.id_criterio_programa) }}
                  </p>
                </div>
              </v-layout>
            </div>
          </v-row>
          <v-row>
            <h2 class="featured">
              Cursos
              <strong>Relacionados</strong>
            </h2>
            <v-layout class="cards course-cards flex-wrap justify-center">
              <list-cursos-cards
                v-if="programa.programa_curso"
                :curso-data="programa.programa_curso"
              />
            </v-layout>
          </v-row>
        </v-layout>
      </v-flex>
    </v-row>
  </v-layout>
</template>
<script>
import {get} from '@/services/abstract.service';
export default {
  name: 'ProgramaDetail',
  data: () => ({
    programa: {},
    loading: false,
    criterios: [],
  }),
  async mounted() {
    await this.getData();
    await this.getCriterioPrograma();
  },
  methods: {
    async getData() {
      this.loading = true;
      const response = await get(`programas/${this.$route.params.id}`);
      this.loading = false;
      this.programa = response.data.data;
      console.log('programa', this.programa);
    },
    async getCriterioPrograma() {
      const response = await get('/criterio-programa?pagination=false');
      this.criterios = response.data.data;
    },
    displayCriterio(id) {
      const item = this.criterios.find(res => res.id_criterio == id);
      return item ? item.tx_criterio_descricao : '';
    },
  },
};
</script>
