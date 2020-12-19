<template>
  <div id="busca-curso">
    <v-autocomplete
      flat
      v-model="select"
      :search-input.sync="search"
      hide-details
      :items="filteredCursos"
      :loading="isLoading"
      item-text="tx_nome_curso"
      item-value="id_curso"
      prepend-inner-icon="mdi-feature-search-outline"
      label="Busque um curso"
      solo-inverted
      clearable
    >
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="fas fa-exclamation-triangle">
          <span>Não encontramos nenhum curso com este nome.</span>
        </v-alert>
      </template>

      <template v-slot:item="{item}">
        <v-list-item-avatar>
          <v-img
            v-if="item.tx_url_imagem_curso"
            :src="item.tx_url_imagem_curso"
          />
        </v-list-item-avatar>

        <v-list-item-content @click="$router.push(`/curso/${item.id_curso}`)">
          <v-list-item-title v-text="item.tx_nome_curso" />
          <v-list-item-subtitle
            v-text="item.tematica_curso.tx_nome_tematica_curso"
          />
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>
<script>
import {get} from '@/services/abstract.service';
export default {
  data: () => ({
    search: '',
    select: null,
    filteredCursos: [],
    isLoading: false,
  }),
  watch: {
    search(val) {
      return val !== this.select ? this.filterCursos(val) : '';
    },
  },
  methods: {
    async filterCursos(val) {
      this.isLoading = true;
      let items = await this.getCurso(val);
      setTimeout(() => {
        this.filteredCursos = items.filter(res => {
          return (
            (res.tx_nome_curso || '')
              .toLowerCase()
              .indexOf((val || '').toLowerCase()) > -1
          );
        });
        this.isLoading = false;
      }, 200);
    },
    async getCurso(val) {
      const response = await get(`/curso?search=tx_nome_curso:${val}`);
      return response.data ? response.data.data : [];
    },
  },
};
</script>

<style>
#busca-curso .v-input__slot {
  background-color: var(--v-white-base);
}
#busca-curso .v-select__slot input {
  color: var(--v-black-base);
}
#busca-curso .v-text-field .v-input__prepend-inner {
  padding-right: 12px;
}
.v-menu__content.v-autocomplete__content .v-alert.error {
  color: var(--v-white-base);
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 0;
}
.v-menu__content.v-autocomplete__content .v-list-item.v-list-item--link {
  padding: 0 24px;
}
</style>
