<template>
  <v-container>
    <v-row class="section align-center">
      <v-col cols="12" sm="6">
        <h3 class="subtitle">Qual curso você está procurando?</h3>
        <p>
          A EV.G classifica os cursos por temáticas. Assim, você pode se
          especializar em uma área e fazer a diferença na sua atuação.
        </p>
      </v-col>
      <v-col cols="12" sm="6">
        <search-curso />
      </v-col>
    </v-row>

    <v-tabs vertical class="mt-4">
      <v-tab
        v-for="(item, i) in catalogo.data"
        :key="i"
        @click="setListCurso(i)"
        :data-paleta-bg-active="item.tx_paleta_de_cores"
        :data-paleta-arrow="item.tx_paleta_de_cores"
      >
        {{ item.tx_nome_tematica_curso }}
      </v-tab>

      <v-tabs-items>
        <list-cursos-cards
          v-if="cursoData.length"
          :curso-data="cursoData"
          view-catalogo
        />
      </v-tabs-items>
    </v-tabs>

  </v-container>
</template>
<script>
import {get} from '@/services/abstract.service';
import {mapGetters, mapActions} from "vuex";
export default {
  data: () => ({
    cursoData: [],
    catalogo: {},
  }),
  mounted() {
    this.setLoading(true);
    this.getAllCatalogo();
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['setLoading']),
    async getAllCatalogo() {
      let url = this.user.id_usuario ?`/catalogo-curso?id_usuario=${this.user.id_usuario}` : `/catalogo-curso`;
      const response = await get(url);
      this.catalogo = response.data;
      this.setListCurso(0);
      this.setLoading(false);
    },
    setListCurso(index) {
      this.cursoData = this.catalogo.data[index].curso;
    },
  },
};
</script>

<style>
.section.row {
    margin-top: 0;
}
.theme--light.v-tabs > .v-tabs-bar,
.theme--light.v-tabs-items {
  background-color: transparent;
}
.v-tab {
  justify-content: flex-end;
}
.v-tabs-bar {
  margin-top: 8px;
  margin-right: 8px;
}
.v-tabs-slider-wrapper {
  display: none;
}
.v-tabs--vertical > .v-tabs-bar .v-tab {
  color: var(--v-white-base);
  padding-right: 24px;
}
.v-tabs--vertical > .v-tabs-bar .v-tab:before {
  display: none;
}
.v-tabs--vertical > .v-tabs-bar .v-tab.v-tab--active:after {
  border-style: solid;
  border-width: 24px 0 24px 16px;
  border-bottom-color: var(--v-lightgrey-base);
  border-right-color: var(--v-lightgrey-base);
  border-top-color: var(--v-lightgrey-base);
  content: "";
  float: right;
  height: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
}
@media (max-width: 600px) {
  .v-tabs--vertical {
    flex-wrap: wrap;
  }
}
</style>
