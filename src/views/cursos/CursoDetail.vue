<template>
  <v-container>
    <v-row
      v-if="!loading && curso.tematica_curso"
      style="background-color: #FB8C00"
    >
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="6" lg="5" class="headline white--text">
            <small>
              {{curso.tematica_curso ? curso.tematica_curso.tx_nome_tematica_curso : '' }}
            </small>
            <h3>{{ curso.tx_nome_curso }}</h3>
            <v-card-text>{{ curso.tx_apresentacao }}</v-card-text>
          </v-col>
          <v-col cols="5">
            <v-card-text style="position: relative">
              <v-img
                max-width="425"
                max-height="276"
                :src="loadImg(curso.tematica_curso.tx_url_imagem_bg)"
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
    <v-row v-if="!loading && curso.tematica_curso">
      <v-flex
        style="margin-top: -95px"
        xs12
        sm8
        offset-sm2
        align-center
        justify-center
      >
        <v-layout column class="justify-center align-center">
          <v-row class="section" align="center" justify="center"
            ><v-col>
              <v-img
                max-width="200"
                max-height="140"
                :src="loadImg(curso.tematica_curso.tx_url_imagem_personagem)"
              ></v-img>
            </v-col>
            <div class="box">
              <h4>Oferta</h4>
              <v-layout class="flex-wrap">
                <v-row>
                  <v-col cols="6">
                    <h5>CERTIFICADOR</h5>
                    <p>
                      {{ curso.tp_origem_curso }}
                    </p>
                  </v-col>
                  <v-col cols="6">
                    <h5>CARGA HORÁRIA</h5>
                    <p>
                      {{ `${curso.qt_carga_horaria_minima}h` }}
                    </p>
                  </v-col>
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
                  <v-col>
                    <div>
                      <h5>CONTEÚDO PROGRAMÁTICO</h5>
                      <v-card-text v-html="curso.tx_conteudo_programatico" />
                    </div>
                  </v-col>
                </v-row>
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
          </v-row>
          <v-row class="section" align="center" justify="center">
            <div class="box">
              <h4>OUTRAS INFORMAÇÕES</h4>
              <v-layout class="flex-wrap">
                <v-row align="center" justify="center">
                  <p>
                    Você pode inscrever-se a qualquer momento e iniciar
                    imediatamente.
                  </p>
                  <p>
                    Realize o
                    <a class="primary--text">seu cadastro</a> ou faça o seu
                    <a class="primary--text">login</a> no botão
                    <a class="contrast--text">Entrar</a>.
                  </p>
                  <p>
                    Verifique no campo Público-Alvo se este curso é aberto ou
                    restrito a um público específico.
                  </p>
                </v-row>
              </v-layout>
            </div>
          </v-row>
        </v-layout>
      </v-flex>
      <!-- <v-layout style="margin-top: -5%" class="flex-wrap justify-center">
        <v-row class="section" align="center" justify="center">
          <v-col cols="4" sm="8">
            <div class="box">
              <h4>CONTEÚDO RELACIONADO</h4>
              <v-layout class="flex-wrap">
              </v-layout>
            </div>
          </v-col>
        </v-row>
      </v-layout> -->
    </v-row>
  </v-container>
</template>
<script>
import {get} from '@/services/abstract.service';
import filters from '@/filters';
import constants from '@/util/constants';
export default {
  name: 'CursoDetail',
  mixins: [filters],
  data: () => ({
    curso: {},
    loading: false,
    constant: constants,
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
    },
    loadImg(path) {
      let imgPath = path.replace(/\s+/g, '%20');
      return `https://www.escolavirtual.gov.br/${imgPath}`;
    },
  },
};
</script>
