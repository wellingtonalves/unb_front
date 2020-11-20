<template>
  <form-skeleton :loading="loading">
    <v-form @submit.prevent="save" ref="form" v-show="!loading">
      <v-row>
        <v-col v-if="!emailOrPasswordPage" class="d-flex" cols="4" sm="6">
          <v-text-field
            v-model="dataResponse.pessoa.tx_nome_pessoa"
            :error-messages="errorData['pessoa.tx_nome_pessoa']"
            :rules="rules.required"
            outlined
            label="Nome"
            required
          />
        </v-col>

        <v-col v-if="!emailOrPasswordPage" class="d-flex" cols="4" sm="6">
          <v-text-field
            v-model="dataResponse.pessoa.tx_nome_social"
            outlined
            label="Nome Social"
            required
          />
        </v-col>

        <v-col v-if="!pagePwd" class="d-flex" cols="4" sm="6">
          <v-text-field
            v-model="dataResponse.pessoa.tx_email_pessoa"
            :error-messages="errorData['pessoa.tx_email_pessoa']"
            :rules="rules.emailRules"
            outlined
            label="E-mail"
            required
          />
        </v-col>

        <v-col v-if="pageEmail" class="d-flex" cols="4" sm="6">
          <v-text-field
            v-model="confirm_email"
            :rules="[compareEmail]"
            outlined
            label="Confirme o novo E-mail"
            required
          />
        </v-col>

        <v-col v-if="pagePwd" class="d-flex" cols="4" sm="6">
          <v-text-field
            v-model="dataResponse.tx_senha_usuario"
            :error-messages="errorData['pessoa.password']"
            :rules="rules.required"
            outlined
            label="Digite a Nova Senha"
            required
          />
        </v-col>

        <v-col v-if="pagePwd" class="d-flex" cols="4" sm="6">
          <v-text-field
            v-model="confirm_password"
            :rules="[comparePasswords]"
            outlined
            label="Confirme a Nova Senha"
            required
          />
        </v-col>

        <v-col v-if="!emailOrPasswordPage" class="d-flex" cols="4" sm="6">
          <v-text-field
            v-model="dataResponse.pessoa.tx_email_institucional"
            :error-messages="errorData['pessoa.tx_email_institucional']"
            outlined
            label="E-mail institucional"
            required
          />
        </v-col>

        <v-col v-if="!emailOrPasswordPage" class="d-flex" cols="4" sm="6">
          <v-select
            v-model="dataResponse.pessoa.tp_sexo"
            :error-messages="errorData['pessoa.tp_sexo']"
            :rules="rules.required"
            outlined
            label="Sexo"
            :items="tpSexo"
            item-text="label"
            item-value="value"
          />
        </v-col>

        <v-col v-if="!emailOrPasswordPage" class="d-flex" cols="4" sm="6">
          <v-autocomplete
            v-model="dataResponse.pessoa.sg_pais_nacionalidade"
            :error-messages="errorData['pessoa.sg_pais_nacionalidade']"
            :rules="rules.required"
            outlined
            label="País"
            :items="pais"
            item-text="tx_nome_pais"
            item-value="sg_pais"
            @change="checkPais()"
          />
        </v-col>

        <v-col class="d-flex" cols="4" sm="6" v-if="!this.isBrasileiro && !emailOrPasswordPage">
          <v-text-field
            v-model="dataResponse.pessoa.nr_passaporte"
            :error-messages="errorData['pessoa.nr_passaporte']"
            :rules="rules.required"
            outlined
            label="Passaporte"
            required
          />
        </v-col>

        <v-col class="d-flex" cols="4" sm="6" v-if="this.isBrasileiro && !emailOrPasswordPage">
          <v-text-field
            v-model="dataResponse.pessoa.nr_cpf"
            :error-messages="errorData['pessoa.nr_cpf']"
            :rules="rules.required"
            v-mask="'###.###.###-##'"
            outlined
            label="CPF"
            required
          />
        </v-col>

        <v-col class="d-flex" cols="4" sm="6" v-if="this.isBrasileiro && !emailOrPasswordPage">
          <v-autocomplete
            v-model="ufModel"
            :rules="rules.required"
            @change="getMunicipio()"
            :items="uf"
            outlined
            label="UF"
            item-text="tx_nome_uf"
            item-value="sg_uf"
          />
        </v-col>

        <v-col class="d-flex" cols="4" sm="6" v-if="this.isBrasileiro && !emailOrPasswordPage">
          <v-autocomplete
            v-model="dataResponse.pessoa.id_municipio_nascimento"
            :error-messages="errorData['pessoa.id_municipio_nascimento']"
            :rules="rules.required"
            :items="municipio"
            outlined
            label="Municipios"
            item-text="tx_nome_municipio"
            item-value="id_municipio_nascimento"
          />
        </v-col>

        <v-col class="d-flex" cols="4" sm="6" v-if="!emailOrPasswordPage">
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
                :error-messages="errorData['pessoa.dt_nascimento']"
                outlined
                label="Data de nascimento"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dataResponse.pessoa.dt_nascimento"
              @input="calendarPopUp = false"
              locale="pt-BR"
            />
          </v-menu>
        </v-col>
      </v-row>

      <v-row class="mt-5" justify="center">
        <slot name="buttons"></slot>
      </v-row>
    </v-form>
  </form-skeleton>
</template>

<script>
import {mask} from 'vue-the-mask';
import {get} from '@/services/abstract.service';

export default {
  name: 'UsuarioForm',
  props: ['data', 'errors', 'userData'],
  directives: {mask},
  data: vm => ({
    loading: true,
    validForm: false,
    dataResponse:
      {
        tp_metodo_autenticacao: 'local',
        pessoa: {
          dt_nascimento: new Date().toISOString().substr(0, 10),
        },
      } || this.data,
    errorData: {
      pessoa: {},
    },
    rules: {
      required: [v => !!v || 'Campo obrigatório'],
      emailRules: [
        v => !!v || 'Campo obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido.',
        v => (v || '').indexOf(' ') < 0 || 'E-mail inválido.',
      ],
    },
    situacaoUsuario: [],
    perfil: [],
    pais: [],
    isBrasileiro: true,
    uf: [],
    municipio: [],
    ufModel: '',
    tpSexo: [
      {
        label: 'Masculino',
        value: 'M',
      },
      {
        label: 'Feminino',
        value: 'F',
      },
    ],
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    calendarPopUp: false,
    confirm_email: '',
    confirm_password: '',
    current: '',
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.dataResponse.pessoa.dt_nascimento);
    },
    compareEmail() {
      return this.dataResponse.pessoa.tx_email_pessoa === this.confirm_email
        ? true
        : 'O e-mail inserido não corresponde ao anterior!';
    },
    comparePasswords() {
      return this.dataResponse.tx_senha_usuario === this.confirm_password
        ? true
        : 'As senhas não combinam !';
    },
    isProfile() {
      return this.current === 'usuario';
    },
    pageEmail() {
      return this.current === 'alterar_email';
    },
    pagePwd() {
      return this.current === 'alterar_senha';
    },
    emailOrPasswordPage() {
      return this.pageEmail || this.pagePwd;
    }
  },
  watch: {
    dataResponse: function(val) {
      this.$emit('update', val);
    },
    errors: function(val) {
      this.errorData = val;
    },
    data: function(val) {
      this.dataResponse = val;
    },
    $route(val) {
      this.current = val.name;
    },
  },

  async mounted() {
    await this.loadItems();
    //TODO - fazer o municiopio funcionar quando for editar.
    // if (this.$route.params.id) {
    // await this.getMunicipio(this.dataResponse.pessoa.id_municipio_nascimento);
    // }
  },
  methods: {
    async loadItems() {
      await this.getPais();
      await this.getUf();
      if (this.isProfile) {
        await this.getTematicaCurso();
        await this.getSituacaoUsuario();
        await this.getPerfil();
      } else {
        this.dataResponse = this.userData;
      }
      this.loading = false;
      console.log('dataResponse', this.dataResponse);
    },
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
      const response = await get(
        `/municipio?pagination=false&search=sg_uf:${this.ufModel}`
      );
      this.municipio = response.data.data;
    },
    checkPais() {
      this.isBrasileiro =
        this.dataResponse.pessoa.sg_pais_nacionalidade !== 'BR' ? false : true;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    save($event) {
      if (this.$refs.form.validate() === false) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    },
  },
};
</script>

<style scoped>
</style>