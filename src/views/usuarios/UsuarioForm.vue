<template>
  <div>
    <v-form lazy-validation ref="form" v-model="validForm">
      <v-row>
        <v-col class="d-flex" cols="4" sm="6">
          <v-text-field
            v-model="dataResponse.tx_login_usuario"
            :error-messages="errorData.tx_login_usuario"
            :rules="rules.required"
            outlined
            label="Login"
            required />
        </v-col>
        
        <v-col class="d-flex" cols="4" sm="6">
          <v-select v-model="dataResponse.id_situacao_usuario" :error-messages="errorData.id_situacao_usuario" :rules="rules.required"
                    outlined label="Situação" :items="situacaoUsuario" item-text="tx_nome_situacao_usuario" item-value="id_situacao_usuario" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="4" sm="6">
          <v-select v-model="dataResponse.id_perfil" :error-messages="errorData.tp_situacao_curso" :rules="rules.required"
                    outlined label="Perfil" :items="perfil" item-text="tx_nome_perfil" item-value="id_perfil" />
        </v-col>

        <v-col class="d-flex" cols="4" sm="6">
          <v-select v-model="dataResponse.tp_sexo" :error-messages="errorData.tp_sexo" :rules="rules.required" 
                    outlined label="Sexo" :items="tpSexo" item-text="label" item-value="value" />
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
    name: "UsuarioForm",
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
      situacaoUsuario: [],
      perfil: [],
      tpSexo: [
        {
          label: 'Masculino',
          value: 'M'
        },
        {
          label: 'Feminino',
          value: 'F'
        }
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
      this.getSituacaoUsuario();
      this.getPerfil();
    },
    methods: {
      async getTematicaCurso() {
        const response = await get('/tematica-curso?pagination=false');
        this.tematicaCurso = response.data.data;
      },
      async getSituacaoUsuario() {
        const response = await get('/situacao-usuario?pagination=false');
        this.situacaoUsuario = response.data.data;
      },
      async getPerfil() {
        const response = await get('/perfil?pagination=false');
        this.perfil = response.data.data;
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