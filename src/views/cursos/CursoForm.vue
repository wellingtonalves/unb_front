<template>
  <div>
    <v-form lazy-validation ref="form" v-model="validForm">
      <v-row>
        <v-col class="d-flex" cols="4" sm="6">
          <v-text-field
            v-model="dataResponse.tx_nome_curso"
            :error-messages="errorData.tx_nome_curso"
            :rules="rules.required"
            outlined
            label="Nome do Curso"
            required />
        </v-col>
        
        <v-col class="d-flex" cols="4" sm="6">
          <v-text-field
            v-model="dataResponse.qt_carga_horaria_minima"
            :error-messages="errorData.qt_carga_horaria_minima"
            :rules="rules.required"
            outlined
            type="number"
            label="Carga horária mínima"
            required />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="4" sm="6">
          <v-select v-model="dataResponse.tp_situacao_curso" :error-messages="errorData.tp_situacao_curso" :rules="rules.required"
                    outlined label="Status do curso" :items="statusCurso" item-text="label" item-value="value" />
        </v-col>

        <v-col class="d-flex" cols="4" sm="6">
          <v-select v-model="dataResponse.id_tematica_curso" :error-messages="errorData.id_tematica_curso" :rules="rules.required" 
                    outlined label="Temática curso" :items="tematicaCurso" item-text="tx_nome_tematica_curso" item-value="id_tematica_curso" />
        </v-col>
        
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="4" sm="6">
          <v-text-field
            v-model="dataResponse.tx_url_video_curso"
            :error-messages="errorData.tx_url_video_curso"
            outlined
            label="Url do vídeo do curso"
            required />
        </v-col>

        <v-col class="d-flex" cols="4" sm="6">
          <v-select v-model="dataResponse.tp_origem_curso" :error-messages="errorData.tp_origem_curso" :rules="rules.required"
                    :items="tpOrigemCurso" outlined label="Origem do curso" item-text="label" item-value="value" />
        </v-col>
      </v-row>
      
      <v-row>
        
        <v-col class="d-flex" cols="4" sm="6">
          <v-menu
            v-model="calendarPopUp"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                :error-messages="errorData.dt_lancamento"
                outlined
                label="Data de lançamento"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dataResponse.dt_lancamento" @input="calendarPopUp = false" locale="pt-BR" />
          </v-menu>
        </v-col>

        <v-col>
          <v-switch v-model="dataResponse.bl_destaque_curso" :error-messages="errorData.bl_destaque_curso"
                    label="Curso em destaque ?" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <span>Conteúdo programático</span>
<!--          TODO - validar campo(deixar em vermelho) quando o conteudo não for preenchido-->
          <ckeditor :editor="editor" v-model="dataResponse.tx_conteudo_programatico"></ckeditor>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <span>Apresentação</span>
<!--          TODO - validar campo(deixar em vermelho) quando o conteudo não for preenchido-->
          <ckeditor :editor="editor" v-model="dataResponse.tx_apresentacao"></ckeditor>
        </v-col>
      </v-row>

      <v-row class="mt-5" justify="center">
        <slot name="buttons"></slot>
      </v-row>

    </v-form>
  </div>
</template>

<script>
  import {get} from "@/services/abstract.service";
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  
  export default {
    name: "CursoForm",
    props: ['data', 'errors'],
    data: vm => ({
      validForm: false,
      dataResponse: {
        dt_lancamento: new Date().toISOString().substr(0, 10) 
      } || this.data,
      errorData: {},
      rules: {
        required: [v => !!v || 'Campo obrigatório'],
      },
      statusCurso: [
        {
          label: 'ATIVO',
          value: 'A'
        },
        {
          label: 'INATIVO',
          value: 'I'
        },
      ],
      tpOrigemCurso: [
        'MIGRADO',
        'ENAP'
      ],
      tematicaCurso: [],
      editor: ClassicEditor,
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      calendarPopUp: false,
    }),
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.dataResponse.dt_lancamento)
      },
    },
    watch: {
      dataResponse: function (val) {
        this.$emit('update', val);
      },
      errors: function (val) {
        this.errorData = val;
      },
      data: function (val) {
        this.dataResponse = val;
      },
    },
    mounted() {
      this.getTematicaCurso();
    },
    methods: {
      async getTematicaCurso() {
        const response = await get('/tematica-curso?pagination=false');
        this.tematicaCurso = response.data.data;
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      }
    }
  }
</script>

<style scoped>

</style>