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
          <v-autocomplete v-model="dataResponse.sg_pais_nacionalidade" :error-messages="errorData.sg_pais_nacionalidade" :rules="rules.required"
                    outlined label="País" :items="pais" item-text="tx_nome_pais" item-value="sg_pais" />
        </v-col>

<!--        TODO LOGICA PARA MOSTRAR E ESCONDER ESSE CAMPO-->
<!--        <v-col class="d-flex" cols="4" sm="6" v-show="false">-->
<!--          <v-text-field-->
<!--            v-model="dataResponse.tx_login_usuario"-->
<!--            :error-messages="errorData.tx_login_usuario"-->
<!--            :rules="rules.required"-->
<!--            outlined-->
<!--            label="Passaporte"-->
<!--            required-->
<!--          />-->
<!--        </v-col>-->

        <v-col class="d-flex" cols="4" sm="6">
          <v-autocomplete v-model="ufModel" :rules="rules.required" @change="getMunicipio()"
                    :items="uf" outlined label="UF" item-text="tx_nome_uf" item-value="sg_uf" />
        </v-col>

        <v-col class="d-flex" cols="4" sm="6">
          <v-autocomplete v-model="dataResponse.id_municipio_nascimento" :error-messages="errorData.id_municipio_nascimento" :rules="rules.required"
                          :items="municipio" outlined label="Municipios" item-text="tx_nome_municipio" item-value="id_municipio" />
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

      <v-row class="mt-5" justify="center">
        <slot name="buttons"></slot>
      </v-row>

    </v-form>
  </div>
</template>

<script>
  import {get} from "@/services/abstract.service";
  
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
      pais: [],
      uf: [],
      municipio: [],
      ufModel: '',
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
      tematicaCurso: [],
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
      this.getPais();
      this.getUf();
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
      async getPais() {
        const response = await get('/pais?pagination=false');
        this.pais = response.data.data;
      },
      async getUf() {
        const response = await get('/uf?pagination=false');
        this.uf = response.data.data;
      },
      async getMunicipio() {
        const response = await get(`/municipio?pagination=false&search=sg_uf:${this.ufModel}`);
        this.municipio = response.data.data;
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