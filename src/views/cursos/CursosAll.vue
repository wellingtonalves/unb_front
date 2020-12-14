<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="featured">
          Qual curso você está procurando?
        </h2>
        <v-card-subtitle>
            A EV.G classifica os cursos por temáticas. Assim, você pode se especializar em uma área e fazer a diferença na sua atuação.
        </v-card-subtitle>
      </v-col>
      <v-col>
        <v-card-text>
          <search-curso />
        </v-card-text>
      </v-col>
    </v-row>
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
