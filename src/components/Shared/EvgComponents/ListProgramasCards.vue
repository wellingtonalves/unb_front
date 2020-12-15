<template>
  <v-layout class="cards course-cards flex-wrap justify-center">
    <v-card class="d-flex" v-for="(programa, p) of programaData" :key="p">
      <div>
        <v-img :src="programa.tx_url_imagem"></v-img>
        <h3 class="v-card__title">
          <a @click="goToDetailPrograma(programa.id_programa)">{{
            programa.tx_nome_programa
          }}</a>
        </h3>
      </div>
      <dl>
        <dt>Carga Horária:</dt>
        <dd>{{ `${programa.qt_carga_horaria}h` }}</dd>
      </dl>
      <v-card-actions>
        <v-btn
          tile
          outlined
          color="primary"
          class="ma-2"
          @click="viewPrograma = p"
        >
          <v-icon>mdi-information</v-icon>
          <span class="d-sr-only">Saiba mais</span>
        </v-btn>
        <v-btn tile color="contrast" class="ma-2 flex-grow-1">
          Acesse
          <v-icon right>mdi-menu-right</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <v-card
          v-if="viewPrograma === p"
          class="transition-fast-in-fast-out v-card--reveal"
        >
          <p class="v-card__text">{{ programa.tx_apresentacao }}</p>
          <v-card-actions>
            <v-btn text @click="viewPrograma = ''">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-layout>
</template>
<script>
import filters from '@/filters';

export default {
  name: 'ListProgramasCards',
  props: {
    programaData: Array,
  },
  mixins: [filters],
  data: () => ({
    viewPrograma: '',
  }),
  methods: {
    goToDetailPrograma(path) {
      return this.$router.push(`/programa/${path}`);
    },
  },
};
</script>
