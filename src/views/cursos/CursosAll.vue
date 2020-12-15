<template>
  <v-container>
    
    <v-row class="section">
      <v-col cols="12" sm="6">
        <h3 class="subtitle">Qual curso você está procurando?</h3>
        <p>A EV.G classifica os cursos por temáticas. Assim, você pode se especializar em uma área e fazer a diferença na sua atuação.</p>
      </v-col>
      <v-col cols="12" sm="6">
        <search-curso />
      </v-col>
    </v-row>

  <!-- TODO: formato novo -->
    <v-tabs vertical>
      <v-tab
        v-for="(item, i) in catalogo.data"
        :key="i"
        @click="setListCurso(i)"
      >
        {{ item.tx_nome_tematica_curso }}
      </v-tab>

      <v-tab-item>
        <list-cursos-cards
          v-if="cursoData.length"
          :curso-data="cursoData"
          view-catalago
        />
      </v-tab-item>
    </v-tabs>

  <!-- TODO: formato antigo -->
    <v-flex align-center justify-center>
      <v-layout column class="justify-center align-center">
        <v-row v-if="catalogo">
          <v-col>
            <h4 class="headline">TEMÁTICAS</h4>
            <v-list>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                  v-for="(item, i) in catalogo.data"
                  :key="i"
                  @click="setListCurso(i)"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.tx_nome_tematica_curso"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col>
            <h4 class="headline">Cursos</h4>
            <list-cursos-cards
              v-if="cursoData.length"
              :curso-data="cursoData"
              view-catalago
            />
          </v-col>
        </v-row>
      </v-layout>
    </v-flex>

  </v-container>
</template>
<script>
import {get} from '@/services/abstract.service';
export default {
  data: () => ({
    cursoData: [],
    catalogo: {},
    selectedItem: 0,
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