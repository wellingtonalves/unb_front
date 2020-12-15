<template>
  <v-layout class="cards course-cards flex-wrap justify-center">
    <v-card class="d-flex" v-for="(curso, c) of cursoData" :key="c">
      <div>
        <v-img :src="curso.tx_url_imagem_curso"></v-img>
        <p v-if="curso.tematica_curso" class="nome-tematica" data-paleta-bg="9">
          {{ curso.tematica_curso.tx_nome_tematica_curso }}
        </p>
        <p v-if="!viewCatalago" class="nome-oferta">
          {{ curso.tp_situacao_curso | displayLabel('statusCurso') }}
        </p>
        <h3 class="v-card__title">
          <a @click="goToDetailCurso(curso.id_curso)">{{
            curso.tx_nome_curso
          }}</a>
        </h3>
      </div>
      <dl>
        <dt v-if="curso.tp_origem_curso">Conteudista:</dt>
        <dd v-if="curso.tp_origem_curso">{{ curso.tp_origem_curso }}</dd>
        <dt>Carga Horária:</dt>
        <dd>{{ `${curso.qt_carga_horaria_minima}h` }}</dd>
      </dl>
      <v-card-actions>
        <v-btn
          tile
          outlined
          color="primary"
          class="ma-2"
          @click="goToDetailCurso(curso.id_curso)"
        >
          <v-icon>mdi-information</v-icon>
          <span class="d-sr-only">Saiba mais</span>
        </v-btn>
        <v-btn
          tile
          color="contrast"
          :disabled="curso.tp_situacao_curso != 'A'"
          class="ma-2 flex-grow-1"
          href="https://www.escolavirtual.gov.br/secretaria/inscricao/5437"
        >
          {{
            curso.tp_situacao_curso == 'A'
              ? 'Inscreva-se'
              : 'Em breve'
          }}
          <v-icon v-if="curso.tp_situacao_curso == 'A'" right>mdi-menu-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>
<script>
import filters from '@/filters';

export default {
  name: 'ListCursosCards',
  props: {
    cursoData: Array,
    viewCatalago: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [filters],
  methods: {
    goToDetailCurso(path) {
      return this.$router.push(`/curso/${path}`);
    },
  },
};
</script>
