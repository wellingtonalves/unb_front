<template>
  <v-layout wrap>
    <v-row v-if="!loading && curso" style="background-color: #FB8C00">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="4" lg="4" class="headline white--text">
            <small>{{
              curso.tematica_curso
                ? curso.tematica_curso.tx_nome_tematica_curso
                : ''
            }}</small>
            <h3>{{ curso.tx_nome_curso }}</h3>
            <v-card-text>{{ curso.tx_apresentacao }}</v-card-text>
          </v-col>
          <v-col cols="4">
            <v-card-text style="position: relative">
              <v-img
                max-width="425"
                max-height="276"
                src="https://cdn.evg.gov.br/cursos/211_EVG/banner.svg"
              ></v-img>
              <v-chip
                absolute
                left
                dark
                style="border-radius: 15px 50px;margin-top: -8px"
              >
                {{ curso.tp_situacao_curso | displayLabel('statusCurso') }}
              </v-chip>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-row v-if="!loading && curso">
      <v-layout style="margin-top: -7%" class="flex-wrap justify-center">
        <v-row class="section" align="center" justify="center">
          <v-col cols="4" sm="8">
            <v-img
              max-width="200"
              max-height="140"
              src="https://www.escolavirtual.gov.br/img/tematicas/Inovacao_pers.svg"
            ></v-img>
            <div class="box">
              <h4>Oferta</h4>
              <v-layout class="flex-wrap">
                <div>
                  <h5>CERTIFICADOR</h5>
                  <p>
                    {{ curso.tp_origem_curso }}
                  </p>
                </div>
                <div>
                  <h5>CARGA HORÁRIA</h5>
                  <p>
                    {{ `${curso.qt_carga_horaria_minima}h` }}
                  </p>
                </div>
                <!-- <div>
                  <h5>DISPONIBILIDADE</h5>
                  <p>
                    30 dias
                  </p>
                </div> -->
                <!-- <div>
                  <h5>PÚBLICO ALVO</h5>
                  <p>
                    O curso foi desenvolvido com foco em servidoras e servidores
                    da Administração Pública nos níveis de governo federal,
                    estadual e municipal que tenham interesse em dicas sobre a
                    aplicação de tecnologias ao serviço público. Qualquer pessoa
                    pode realizar o curso.
                  </p>
                </div> -->

                <div>
                  <h5>CONTEÚDO PROGRAMÁTICO</h5>
                  <v-card-text v-html="curso.tx_conteudo_programatico" />
                </div>
              </v-layout>
              <v-container text-center>
                <v-btn
                  tile
                  href="https://www.escolavirtual.gov.br/secretaria/inscricao/318"
                  color="contrast"
                  dark
                  class="ma-2 flex-grow-1"
                >
                  <span class="hidden-xs-only"> Inscreva-se</span>
                  <v-icon right>
                    mdi-menu-right
                  </v-icon>
                </v-btn>
              </v-container>
            </div>
          </v-col>
        </v-row>
      </v-layout>
    </v-row>
  </v-layout>
</template>
<script>
import {get} from '@/services/abstract.service';
import filters from '@/filters';
export default {
  name: 'CursoDetail',
  mixins: [filters],
  data: () => ({
    curso: {},
    loading: false,
  }),
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const response = await get(`curso/${this.$route.params.id}`);
      this.loading = false;
      this.curso = response.data.data;
      console.log('curso', this.curso);
    },
  },
};
</script>
