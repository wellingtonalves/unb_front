<template>
  <v-layout column>

    <div
      v-if="!loading && curso.tematica_curso"   
      class="py-8"
      :data-paleta-bg="curso.tematica_curso.tx_paleta_de_cores">
      <v-container>
        <v-row>
          <v-col cols="12" sm="8" class="white--text">
            <small>
              {{curso.tematica_curso ? curso.tematica_curso.tx_nome_tematica_curso : '' }}
            </small>
            <h2 class="white--text">{{ curso.tx_nome_curso }}</h2>
            <p class="mt-2">{{ curso.tx_apresentacao }}</p>
          </v-col>
          <v-col cols="12" sm="4">
            <v-img :src="curso.tx_url_imagem_curso"></v-img>
            <v-chip color="secondary">
              {{ curso.tp_situacao_curso | displayLabel('statusCurso') }}
            </v-chip>
          </v-col>
        </v-row>
      </v-container>
    </div>
  
    <v-container v-if="!loading && curso.tematica_curso">      
      <div class="box my-16">
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
    </v-container>

    <div class="outras-informacoes" :data-paleta-bg="curso.tematica_curso.tx_paleta_de_cores">
      <v-container>
        <v-row class="align-center">
          <v-col cols="12" sm="3">
            <v-img
              max-width="200"
              max-height="140"
              class="tematica-personagem"
              :src="loadImg(curso.tematica_curso.tx_url_imagem_personagem)"
            ></v-img>
          </v-col>

          <v-col cols="12" sm="3">
            <h3 class="white--text font-weight-light">Outras Informações</h3>
          </v-col>

          <v-col cols="12" sm="6">
            
            <v-layout wrap class="white--text">
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
            </v-layout>
          </v-col>
        </v-row>
      </v-container>
    </div>

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

<style>
.outras-informacoes {
  position: relative;
}
.outras-informacoes h3 {
  font-size: 1.75rem;
  text-transform: uppercase;
}
.outras-informacoes p:last-child {
  margin-bottom: 0;
}
.tematica-personagem {
  margin-bottom: -36px !important;
}
.v-chip {
  border-radius: 0 16px 16px 16px !important;
  margin-top: -8px;
}
</style>