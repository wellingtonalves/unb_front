<template>
  <v-container>
    <v-row class="section">
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

    <v-tabs vertical>
      <v-tab
        v-for="(item, i) in catalogo.data"
        :key="i"
        @click="setListCurso(i)"
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
export default {
  data: () => ({
    cursoData: [],
    catalogo: {},
  }),
  created() {
    this.getAllCatalogo();
  },
  methods: {
    async getAllCatalogo() {
      const response = await get('/catalogo-curso');
      this.catalogo = response.data;
      this.setListCurso(0);
    },
    setListCurso(index) {
      this.cursoData = this.catalogo.data[index].curso;
    },
  },
};
</script>

<style>
.theme--light.v-tabs > .v-tabs-bar,
.theme--light.v-tabs-items {
  background-color: transparent;
}

@media (max-width: 600px) {
  .v-tabs--vertical {
    flex-wrap: wrap;
  }
}
</style>
