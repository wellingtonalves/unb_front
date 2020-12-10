<template>
  <v-layout column>

    <!-- TODO: substituir RED no style abaixo por COR DA TEMÁTICA -->
    <v-container v-if="!loading && curso.tematica_curso" style="background-color:red;">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" class="white--text">
          <small>
            {{curso.tematica_curso ? curso.tematica_curso.tx_nome_tematica_curso : '' }}
          </small>
          <h2 class="white--text">{{ curso.tx_nome_curso }}</h2>
          <p>{{ curso.tx_apresentacao }}</p>
        </v-col>
        <v-col cols="12" sm="6">
          <v-img :src="loadImg(curso.tematica_curso.tx_url_imagem_bg)" contain></v-img>
          <v-chip
            absolute
            left
            dark
            style="border-radius: 15px 50px;margin-top: -8px"
          >
            {{ curso.tp_situacao_curso | displayLabel('statusCurso') }}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>
  
    <v-container v-if="!loading && curso.tematica_curso" style="margin-top: -48px">
      <v-img
          max-width="200"
          max-height="140"
          :src="loadImg(curso.tematica_curso.tx_url_imagem_personagem)"
        ></v-img>
      
      <div class="box">
        <h3>Oferta</h3>
        <v-row>
          <v-col cols="12" sm="6">
            <h4>Certificador</h4>
            <p>{{ curso.tp_origem_curso }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <h4>Carga Horária</h4>
            <p>{{ `${curso.qt_carga_horaria_minima}h` }}</p>
          </v-col>
          <v-col>
            <h4>Conteúdo Programático</h4>
            <v-card-text v-html="curso.tx_conteudo_programatico" />
          </v-col>
        </v-row>
        
        <v-flex text-center mb-4>
          <v-btn
            tile
            dark
            href="https://www.escolavirtual.gov.br/secretaria/inscricao/318"
            color="contrast"
            class="ma-2"
          >
            Inscreva-se
            <v-icon right>mdi-menu-right</v-icon>
          </v-btn>
        </v-flex>
      </div>
      
      <div class="box mt-12">
        <h3>Outras Informações</h3>
        <v-layout class="flex-wrap">
          <div>
            <p>
              Você pode inscrever-se a qualquer momento e iniciar imediatamente.
            </p>
            <p>
              Realize o
              <strong>seu cadastro</strong> ou faça o seu
              <strong>login</strong> no botão
              <strong>Entrar</strong>.
            </p>
            <p>
              Verifique no campo Público-Alvo se este curso é aberto ou
              restrito a um público específico.
            </p>
          </div>
        </v-layout>
      </div>
      
    </v-container>
  </v-layout>
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
