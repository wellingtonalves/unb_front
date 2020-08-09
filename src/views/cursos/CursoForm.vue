<template>
  <div>
    <v-form lazy-validation ref="form" v-model="validForm">
      <v-text-field
        v-model="dataResponse.tx_nome_curso"
        :error-messages="errorData.tx_nome_curso"
        solo
        placeholder="Nome do Curso"
        required />

      <v-text-field
        v-model="dataResponse.qt_carga_horaria_minima"
        :error-messages="errorData.qt_carga_horaria_minima"
        solo
        type="number"
        placeholder="Carga horária mínima"
        required />

      <v-select v-model="dataResponse.id_tematica_curso" solo label="Origem do curso" :items="tematicaCurso"
                item-text="tx_nome_tematica_curso" item-value="id_tematica_curso" />

    </v-form>
  </div>
</template>

<script>
  import {getAll} from "@/services/abstract.service";

  export default {
    name: "CursoForm",
    data: () => ({
      validForm: false,
      dataResponse: {},
      errorData: {},
      tematicaCurso: [],
    }),
    mounted() {
      this.getTematicaCurso();
    },
    methods: {
      async getTematicaCurso() {
        const response = await getAll('/tematica-curso?pagination=false');
        this.tematicaCurso = response.data.data;
      }
    }
  }
</script>

<style scoped>

</style>