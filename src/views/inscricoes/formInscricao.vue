<template>
  <v-container>
    
    <form-skeleton :loading="loading">
      <v-form lazy-validation ref="form" v-model="validForm" v-show="!loading">

        <fieldset class="custom-fieldset">
          <legend>Dados Profissionais</legend>
          <v-row>
            <v-col cols="12" sm="6">
              <v-select v-model="dataResponse.tp_servidor_militar_cidadao" :error-messages="errorData.tp_servidor_militar_cidadao"
                        :items="tpServidorMilitarCidadao" outlined label="Você é..." item-text="label" item-value="value" @change="tratarPessoa()"/>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select v-model="dataResponse.tp_poder_execut_legisl_judic" :error-messages="errorData.tp_poder_execut_legisl_judic"
                        :items="tpPoderExectLegislJudic" outlined label="De qual poder?" item-text="label" item-value="value" 
                        v-show="showFields.tp_servidor_militar_cidadao" @change="tratarPessoa()"/>
            </v-col>

            <v-col cols="12" sm="4">
              <v-select v-model="dataResponse.tp_esfera_servidor_militar" :error-messages="errorData.tp_esfera_servidor_militar"
                        :items="tpEsferaServidorMilitar" outlined label="De qual esfera?" item-text="label" item-value="value"
                        v-show="showFields.tp_esfera_servidor_militar" @change="tratarEsfera()"/>
            </v-col>

            <v-col cols="12" sm="4">
              <v-autocomplete v-model="dataResponse.sg_uf_servidor_estadual" :error-messages="errorData.sg_uf_servidor_estadual" :loading="loadingUf"
                        :items="sgUfServidorEstadual" outlined label="De qual UF?" item-text="tx_nome_uf" item-value="sg_uf" 
                        v-show="showFields.sg_uf_servidor_estadual" @change="tratarRegrasParaUf()"/>
            </v-col>

            <v-col cols="12" sm="4">
              <v-autocomplete v-model="dataResponse.id_municipio_servidor_municipal" :error-messages="errorData.id_municipio_servidor_municipal" :loading="loadingMunicipio"
                        :items="idMunicipioServidorMunicipal" outlined label="De qual Município?" item-text="tx_nome_municipio" item-value="id_municipio" 
                        v-show="showFields.id_municipio_servidor_municipal" />
            </v-col>

            <v-col cols="12">
              <v-autocomplete v-model="dataResponse.id_orgao_servidor" :error-messages="errorData.id_orgao_servidor" :loading="loadingOrgaos"
                        :items="idOrgaoServidor" outlined label="De qual órgão?" item-text="tx_nome_orgao" item-value="id_orgao" 
                        hint="As informações deste campo são disponibilizadas pelo Sistema de Informações Organizacionais do Governo Federal. Caso não encontre a informação que deseje na relação, utilize o órgão imediatamente superior." persistent-hint 
                        v-show="showFields.id_orgao_servidor" />
            </v-col>

            <v-col cols="12" sm="6">
              <v-select v-model="dataResponse.tp_ocupa_cargo_funcao" :error-messages="errorData.tp_ocupa_cargo_funcao"
                        :items="tpOcupaCargoFuncao" outlined label="Ocupa função comissionada?" item-text="label" item-value="value" 
                        v-show="dataResponse.tp_servidor_militar_cidadao == 'S'" />
            </v-col>

            <v-col cols="12" sm="6">
              <v-autocomplete v-model="dataResponse.tp_empregado_terceiro_setor" :error-messages="errorData.tp_empregado_terceiro_setor" :loading="loadingEmpresas"
                        :items="idOrgaoServidor" outlined label="De qual empresa?" item-text="tx_nome_orgao" item-value="id_orgao"
                        v-show="showFields.tp_empregado_terceiro_setor" />
            </v-col>

            <v-col cols="12">
              <v-select v-model="dataResponse.tp_sem_vinculo" :error-messages="errorData.tp_sem_vinculo"
                        :items="tpSemVinculo" outlined label="Selecione sua situação" item-text="label" item-value="value"
                                      v-show="dataResponse.tp_servidor_militar_cidadao == 'SV'" />
            </v-col>
            
          </v-row>
        </fieldset>

        <fieldset class="custom-fieldset">
          <legend>Endereço</legend>
          <v-row>

            <v-col cols="12">
              <v-switch
                v-model="naoResideNoBrasil"
                inset
                label="Não resido no Brasil"
                @change="getNaoResideNoBrasil()"
              />
            </v-col>

            <v-col cols="12" sm="4" v-show="!naoResideNoBrasil">
              <v-autocomplete v-model="dataResponse.uf_pessoal" :error-messages="errorData.uf_pessoal"
                        :items="ufPessoal" outlined label="De qual UF?" item-text="tx_nome_uf" item-value="sg_uf" @change="getMunicipioPessoal()"/>
            </v-col>

            <v-col cols="12" sm="4" v-show="!naoResideNoBrasil">
              <v-autocomplete v-model="dataResponse.id_municipio_endereco_residencial" :error-messages="errorData.id_municipio_endereco_residencial"
                        :items="municipioPessoal" outlined label="De qual Municipio?" item-text="tx_nome_municipio" item-value="id_municipio" />
            </v-col>

            <v-col cols="12" sm="4" v-show="naoResideNoBrasil">
              <v-autocomplete v-model="dataResponse.id_pais" :error-messages="errorData.id_pais" :loading="loadingPais"
                        :items="listaPaises" outlined label="Qual país?" item-text="tx_nome_pais" item-value="sg_pais" />
            </v-col>

          </v-row>
        </fieldset>

        <fieldset class="custom-fieldset">
          <legend>Motivo de Realização do Curso</legend>
          <v-row>
            <v-col>
              <v-select v-model="dataResponse.tp_motivo_realiz_curso" :error-messages="errorData.tp_motivo_realiz_curso"
                        :items="tpMotivoRealizCurso" outlined label="Qual o motivo de realização do curso?" item-text="label" item-value="value"/>
            </v-col>
          </v-row>
        </fieldset>
        
        
        <v-row style="justify-content: center; margin-top: 30px">
          <v-btn class="mx-2" @click="$router.go(-1)">
            <v-icon class="mr-2">mdi-backup-restore</v-icon>
            Voltar
          </v-btn>

          <v-btn class="mx-2" color="primary" :loading="loading" @click="save()">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Salvar
          </v-btn>
        </v-row>

      </v-form>
    </form-skeleton>
    
  </v-container>
</template>

<script>
import {get, create} from "@/services/abstract.service";
import {mapGetters} from "vuex";

export default {
  name: "formInscricao",
  data: () => ({
    loading: false,
    validForm: false,
    dataResponse: {},
    errorData: {},
    tpServidorMilitarCidadao: [
      {
        label: 'SERVIDOR PÚBLICO',
        value: 'S'
      },
      {
        label: 'MILITAR',
        value: 'M'
      },
      {
        label: 'EMPREGADO PÚBLICO',
        value: 'E'
      },
      {
        label: 'EMPREGADO DO TERCEIRO SETOR',
        value: 'ETR'
      },
      {
        label: 'SEM VÍNCULO COM A ADMINISTRAÇÃO PÚBLICA BRASILEIRA',
        value: 'SV'
      },
    ],
    tpPoderExectLegislJudic: [
      {
        label: 'EXECUTIVO',
        value: 'E'
      },
      {
        label: 'JUDICIÁRIO',
        value: 'J'
      },
      {
        label: 'LEGISLATIVO',
        value: 'L'
      },
      {
        label: 'ÓRGÃOS AUTÔNOMOS',
        value: 'O'
      }
    ],
    tpEsferaServidorMilitar: [
      {
        label: 'FEDERAL',
        value: 'F'
      },
      {
        label: 'ESTADUAL',
        value: 'E'
      },
      {
        label: 'MUNICIPAL',
        value: 'M'
      }
    ],
    tpSemVinculo: [
      {
        label: 'ESTUDANTE',
        value: 'ES'
      },
      {
        label: 'AUTÔNOMO',
        value: 'A'
      },
      {
        label: 'EMPREGADO',
        value: 'E'
      },
      {
        label: 'CONSELHOS PROFISSIONAIS',
        value: 'CP'
      },
      {
        label: 'OUTROS',
        value: 'O'
      }
    ],
    tpOcupaCargoFuncao: [
      {
        label: 'SIM',
        value: 'S'
      },
      {
        label: 'NÃO',
        value: 'N'
      },
    ],
    tpMotivoRealizCurso: [
      {
        label: 'Aquisição de Conhecimento',
        value: 'A'
      },
      {
        label: 'Evolução Funcional',
        value: 'E'
      },
      {
        label: 'Solicitação da Chefia',
        value: 'S'
      },
    ],
    sgUfServidorEstadual: [],
    idMunicipioServidorMunicipal: [],
    idOrgaoServidor: [],
    listaPaises: [],
    naoResideNoBrasil: false,
    ufPessoal: [],
    municipioPessoal: [],
    loadingOrgaos: false,
    loadingUf: false,
    loadingMunicipio: false,
    loadingEmpresas: false,
    loadingPais: false,
    showFields: {
      tp_servidor_militar_cidadao: false,
      tp_esfera_servidor_militar: false,
      id_orgao_servidor: false,
      sg_uf_servidor_estadual: false,
      id_municipio_servidor_municipal: false
    }
  }),
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.getUfPessoal();
  },
  methods: {
    async getUf() {
      this.loadingUf = true;
      const response = await get('/uf?pagination=false');
      this.sgUfServidorEstadual = response.data.data;
      this.loadingUf = false;
    },
    async getMunicipio() {
      this.loadingMunicipio = true;
      const response = await get(`/municipio?pagination=false&search=sg_uf:${this.dataResponse.sg_uf_servidor_estadual}`);
      this.idMunicipioServidorMunicipal = response.data.data;
      this.loadingMunicipio = false;
    },
    async getUfPessoal() {
      const response = await get('/uf?pagination=false');
      this.ufPessoal = response.data.data;
    },
    async getMunicipioPessoal() {
      const response = await get(`/municipio?pagination=false&search=sg_uf:${this.dataResponse.uf_pessoal}`);
      this.municipioPessoal = response.data.data;
    },
    async getNaoResideNoBrasil() {
      this.loadingPais = true;
      this.dataResponse.uf_pessoal = null;
      this.dataResponse.id_municipio_endereco_residencial = null;
      this.dataResponse.id_pais = null;
      let response = await get('/pais?pagination=false');
      this.listaPaises = response.data.data.filter(value => value.sg_pais !== 'BR');
      this.loadingPais = false;
    },
    async getOrgao(params) {
      this.loadingOrgaos = true;
      const response = await get(`/orgao?search=bl_status_orgao:true${params}&pagination=false&orderBy=tx_nome_orgao&searchJoin=and`);
      this.idOrgaoServidor = response.data.data;
      this.loadingOrgaos = false;
    },
    tratarPessoa(){
      this.showFields.tp_esfera_servidor_militar = false;
      this.showFields.tp_servidor_militar_cidadao = false;
      this.limparTodosOsCampos();
      
      if (this.dataResponse.tp_servidor_militar_cidadao === 'S') {
        this.showFields.tp_servidor_militar_cidadao = true;
        this.tratarServidorPublico();
      }

      if (this.dataResponse.tp_servidor_militar_cidadao === 'M' || this.dataResponse.tp_servidor_militar_cidadao === 'E') {
        if (this.tpEsferaServidorMilitar.length < 3) {
          this.tpEsferaServidorMilitar.push({label: 'MUNICIPAL', value: 'M'})
        }
        this.dataResponse.tp_poder_execut_legisl_judic =  [];
        this.showFields.tp_esfera_servidor_militar =  true;
        this.tratarEsfera();
      }
      
      if (this.dataResponse.tp_servidor_militar_cidadao === 'ETR') {
        this.showFields.tp_empregado_terceiro_setor = true;
        this.loadingEmpresas = true;
        this.getOrgao(';id_vinculo:7');
        this.loadingEmpresas = false;
      }
      
    },
    tratarServidorPublico() {
      this.dataResponse.tp_esfera_servidor_militar = null;
      const tipoPoder = this.dataResponse.tp_poder_execut_legisl_judic;
      const tipoEsfera = this.tpEsferaServidorMilitar;
      
      if (tipoEsfera.length < 3) {
        this.tpEsferaServidorMilitar.push({label: 'MUNICIPAL', value: 'M'})
      }
      
      if (tipoPoder == 'E' || tipoPoder == 'L' || tipoPoder == 'O') {
        this.showFields.tp_esfera_servidor_militar =  true;
        this.tratarEsfera();
      }

      if (tipoPoder == 'J') {
        this.tpEsferaServidorMilitar = this.tpEsferaServidorMilitar.filter(value => value.value !== 'M')
        this.showFields.tp_esfera_servidor_militar =  true;
        this.tratarEsfera();
      }
    },
    tratarEsfera() {
      const tipoPessoa = this.dataResponse.tp_servidor_militar_cidadao;
      const tipoPoder = this.dataResponse.tp_poder_execut_legisl_judic;
      const tipoEsfera = this.dataResponse.tp_esfera_servidor_militar;

      this.showFields.id_orgao_servidor = false;
      this.showFields.sg_uf_servidor_estadual = false;
      this.showFields.id_municipio_servidor_municipal = false;
      
      if (tipoPessoa === 'S') {
        if (tipoPoder === 'E') {
          this.tratarRegrasServidorPublicoExecutivo(tipoEsfera);
        }

        if (tipoPoder === 'J') {
          this.tratarRegrasServidorPublicoJudiciario(tipoEsfera);
        }

        if (tipoPoder === 'L') {
          this.tratarRegrasServidorPublicoLegislativo(tipoEsfera);
        }

        if (tipoPoder === 'O') {
          this.tratarRegrasServidorPublicoOrgaosAutonomos(tipoEsfera);
        }
      }
      
      if (tipoPessoa === 'M') {
        if (tipoEsfera === 'F') {
          this.getOrgao(';id_esfera:1;id_vinculo:5');
          this.showFields.id_orgao_servidor = true;
        }

        if (tipoEsfera === 'E') {
          this.getOrgao(';id_esfera:2;id_vinculo:5');
          this.showFields.id_orgao_servidor = true;
          this.showFields.sg_uf_servidor_estadual = true;
          this.getUf();
        }
        
        if (tipoEsfera === 'M') {
          this.getOrgao(';id_esfera:3;id_vinculo:5');
          this.showFields.id_orgao_servidor = true;
          this.showFields.sg_uf_servidor_estadual = true;
          this.getUf();
        }
      }

      if (tipoPessoa === 'E') {
        if (tipoEsfera === 'F') {
          this.getOrgao(';id_esfera:1;id_vinculo:6');
          this.showFields.id_orgao_servidor = true;
        }

        if (tipoEsfera === 'E') {
          this.showFields.sg_uf_servidor_estadual = true;
          this.getUf();
        }

        if (tipoEsfera === 'M') {
          this.showFields.sg_uf_servidor_estadual = true;
          this.getUf();
        }
      }
      
    },
    tratarRegrasServidorPublicoExecutivo(tipoEsfera){
      this.limparCamposUfMunicipioOrgao();
      
      if (tipoEsfera === 'F') {
        this.getOrgao(';id_esfera:1;id_vinculo:4');
        this.showFields.id_orgao_servidor = true;
      }

      if (tipoEsfera === 'E' || tipoEsfera === 'M') {
        this.showFields.id_orgao_servidor = false;
        this.showFields.sg_uf_servidor_estadual = true;
        this.getUf();
      }
    },
    tratarRegrasServidorPublicoJudiciario(tipoEsfera){
      if (tipoEsfera === 'F') {
        this.getOrgao(';id_esfera:1;id_vinculo:2');
        this.showFields.id_orgao_servidor = true;
      }

      if (tipoEsfera === 'E') {
        this.getOrgao(';id_esfera:2;id_vinculo:2');
        this.showFields.id_orgao_servidor = true;
        this.showFields.sg_uf_servidor_estadual = true;
        this.getUf();
      }
    },
    tratarRegrasServidorPublicoLegislativo(tipoEsfera){
      this.limparCamposUfMunicipioOrgao();

      if (tipoEsfera === 'F') {
        this.getOrgao(';id_esfera:1;id_vinculo:3');
        this.showFields.id_orgao_servidor = true;
      }

      if (tipoEsfera === 'E') {
        this.getOrgao(';id_esfera:1;id_vinculo:3');
        this.showFields.id_orgao_servidor = true;
        this.showFields.sg_uf_servidor_estadual = true;
        this.getUf();
      }

      if (tipoEsfera === 'M') {
        this.getOrgao(';id_esfera:3;id_vinculo:3');
        this.showFields.id_orgao_servidor = true;
        this.showFields.sg_uf_servidor_estadual = true;
        this.getUf();
      }
    },
    tratarRegrasServidorPublicoOrgaosAutonomos(tipoEsfera){
      this.limparCamposUfMunicipioOrgao();
      
      if (tipoEsfera === 'F') {
        this.getOrgao(';id_esfera:1;id_vinculo:4');
        this.showFields.id_orgao_servidor = true;
      }

      if (tipoEsfera === 'E') {
        this.showFields.sg_uf_servidor_estadual = true;
        this.getUf();
      }

      if (tipoEsfera === 'M') {
        this.getOrgao(';id_esfera:3;id_vinculo:3');
        // this.showFields.id_orgao_servidor = true;
        this.showFields.sg_uf_servidor_estadual = true;
        this.getUf();
      }
    },
    async tratarRegrasParaUf() {
      const tipoPoder = this.dataResponse.tp_poder_execut_legisl_judic;
      const tipoEsfera = this.dataResponse.tp_esfera_servidor_militar;
      const uf = this.dataResponse.sg_uf_servidor_estadual;


      if (tipoEsfera === 'M') {
        this.showFields.id_municipio_servidor_municipal = true;
        this.getMunicipio()
      }
      
      if (tipoPoder === 'O' && tipoEsfera == 'E') {
        const result = await get(`/uf/${this.dataResponse.sg_uf_servidor_estadual}`);
        this.getOrgao(`;id_esfera:2;id_vinculo:4;tx_nome_orgao:${result.data.data.tx_nome_uf}`);
        this.showFields.id_orgao_servidor = true;
      }
      
      if (tipoPoder === 'O' && tipoEsfera == 'M') {
        this.tratarRegrasParaMunicipio(uf);
      }
    },
    /**
     * Quando for um servidor publico, do poder orgãos autonomos da esfera municipal, existe uma regra que diz...
     * se a UF for = BA, GO ou PA, a combo de orgão vai carregar um valor especifico, se não for nenhuma das 3 opções
     * não vai mostrar a combo do orgão e vai setar o valor id_orgao = 100000
     */
    tratarRegrasParaMunicipio(uf) {
      this.showFields.id_municipio_servidor_municipal = true;
      this.getMunicipio()

      if (uf === 'BA' || uf === 'GO' || uf === 'PA') {
        this.idOrgaoServidor = [];
        this.idOrgaoServidor.push({id_orgao: 345, tx_nome_orgao: 'Tribunal de Contas dos Municípios'})
        this.showFields.id_orgao_servidor = true;
      } else {
        this.showFields.id_orgao_servidor = false;
        this.dataResponse.id_orgao_servidor = 100000;
      }
    },
    limparCamposUfMunicipioOrgao() {
      this.dataResponse.sg_uf_servidor_estadual = null;
      this.dataResponse.id_municipio_servidor_municipal = null;
      this.dataResponse.id_orgao_servidor = null;
    },
    limparTodosOsCampos(){
      this.dataResponse.tp_esfera_servidor_militar =  null;
      this.dataResponse.sg_uf_servidor_estadual = null;
      this.dataResponse.id_municipio_servidor_municipal = null;
      this.dataResponse.id_orgao_servidor = null;
    },
    async save() {
      this.dataResponse.id_oferta = this.$route.params.id;
      this.dataResponse.id_pessoa = this.user.id_usuario;
      this.dataResponse.dt_inscricao = new Date();
      //TODO -- isso aqui vai virar regra de negocio na API
      this.dataResponse.tp_situacao_inscricao = 'EM_CURSO'
      console.log(this.dataResponse);

      this.loading = true;
      const response = await create('inscricao', this.dataResponse)
      this.loading = false;

      if (response.errors) {
        this.errorData = response.errors;
        return false;
      }
      
      // this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>