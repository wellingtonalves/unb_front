<template>
  <v-row>
    <v-col cols="4" v-for="(curso, c) of cursoData" :key="c">
      <v-card class="d-flex">
        <div>
          <v-img :src="curso.tx_url_imagem_curso"></v-img>
          <p v-if="curso.tematica_curso" class="nome-tematica" data-paleta-bg="9">
            {{ curso.tematica_curso.tx_nome_tematica_curso }}
          </p>
          <p class="nome-oferta">
            {{ curso.tp_situacao_curso | displayLabel('statusCurso') }}
          </p>
          <h3 class="v-card__title">
            <a @click="$router.push(`/curso/${curso.id_curso}`)">{{curso.tx_nome_curso }}</a>
          </h3>
        </div>
        <dl>
          <dt>Conteudista:</dt>
          <dd>{{ curso.tp_origem_curso }}</dd>
          <dt>Carga Horária:</dt>
          <dd>{{ `${curso.qt_carga_horaria_minima}h` }}</dd>
        </dl>
        <v-card-actions>
          <v-btn
            tile
            outlined
            color="primary"
            class="ma-2"
            @click="viewCurso = c"
          >
            <v-icon>mdi-information</v-icon>
            <span class="d-sr-only">Saiba mais</span>
          </v-btn>
          <v-btn
            tile
            color="contrast"
            class="ma-2 flex-grow-1"
            href="https://www.escolavirtual.gov.br/secretaria/inscricao/5437"
          >
            Inscreva-se
            <v-icon right>mdi-menu-right</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <v-card
            v-if="viewCurso === c"
            class="transition-fast-in-fast-out v-card--reveal"
          >
            <p class="v-card__text">{{ curso.tx_apresentacao }}</p>
            <v-card-actions>
              <v-btn text @click="viewCurso = ''">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  import filters from '@/filters';

  export default {
    name: 'ListCursosCards',
    props: {
      cursoData: Array,
    },
    mixins: [filters],
    data: () => ({
      viewCurso: '',
    }),
  };
</script>
