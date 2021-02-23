<template>
  <v-container>
    
    <form-skeleton :loading="loading">
      <v-form lazy-validation ref="form" v-model="validForm" v-show="!loading">

        <fieldset class="custom-fieldset">
          <legend>Dados Profissionais</legend>
          <v-row>
            <v-col cols="12" sm="6">
              <v-select v-model="dataResponse.tp_servidor_militar_cidadao" :error-messages="errorData.tp_servidor_militar_cidadao"
                        :items="tpServidorMilitarCidadao" outlined label="Você é..." item-text="label" item-value="value" />
            </v-col>

            <v-col cols="12" sm="6">
              <v-select v-model="dataResponse.tp_poder_execut_legisl_judic" :error-messages="errorData.tp_poder_execut_legisl_judic"
                        :items="tpPoderExectLegislJudic" outlined label="De qual poder?" item-text="label" item-value="value" 
                        v-show="dataResponse.tp_servidor_militar_cidadao == 'S'" @change="tratarServidorPublico()" />
            </v-col>

            <v-col cols="12" sm="4">
              <v-select v-model="dataResponse.tp_esfera_servidor_militar" :error-messages="errorData.tp_esfera_servidor_militar"
                        :items="tpEsferaServidorMilitar" outlined label="De qual esfera?" item-text="label" item-value="value"
                        v-show="showFields.tp_esfera_servidor_militar" @change="tratarEsfera()"/>
<!--                        v-show="dataResponse.tp_servidor_militar_cidadao == 'M' || dataResponse.tp_servidor_militar_cidadao == 'E'" />-->
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
<!--              TODO -- essa lista deverá ser filtrada e não está de acordo com os dados de produção-->
              <v-select v-model="dataResponse.tp_empregado_terceiro_setor" :error-messages="errorData.tp_empregado_terceiro_setor"
                        :items="idOrgaoServidor" outlined label="De qual empresa?" item-text="tx_nome_orgao" item-value="id_orgao"
                        v-show="dataResponse.tp_servidor_militar_cidadao == 'ETR'" />
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
              />
            </v-col>

            <v-col cols="12" sm="4" v-show="!naoResideNoBrasil">
              <v-select v-model="dataResponse.sg_uf_servidor_estadual" :error-messages="errorData.sg_uf_servidor_estadual"
                        :items="sgUfServidorEstadual" outlined label="De qual UF?" item-text="tx_nome_uf" item-value="sg_uf" @change="getMunicipio()"/>
            </v-col>

            <v-col cols="12" sm="4" v-show="!naoResideNoBrasil">
              <v-select v-model="dataResponse.sg_uf_servidor_estadual" :error-messages="errorData.sg_uf_servidor_estadual"
                        :items="sgUfServidorEstadual" outlined label="De qual Municipio?" item-text="tx_nome_uf" item-value="sg_uf" @change="getMunicipio()"/>
            </v-col>

            <v-col cols="12" sm="4" v-show="naoResideNoBrasil">
              <v-select v-model="dataResponse.sg_uf_servidor_estadual" :error-messages="errorData.sg_uf_servidor_estadual"
                        :items="sgUfServidorEstadual" outlined label="Qual país?" item-text="tx_nome_uf" item-value="sg_uf" @change="getMunicipio()"/>
            </v-col>

          </v-row>
        </fieldset>

        <fieldset class="custom-fieldset">
          <legend>Motivo de Realização do Curso</legend>
          <v-row>
            <v-col>
              <v-select v-model="dataResponse.sg_uf_servidor_estadual" :error-messages="errorData.sg_uf_servidor_estadual"
                        :items="sgUfServidorEstadual" outlined label="Qual o motivo de realização do curso?" item-text="tx_nome_uf" item-value="sg_uf" @change="getMunicipio()"/>
            </v-col>
          </v-row>
        </fieldset>

        <v-btn class="mt-8" color="primary" :loading="loading" @click="save()">
          <v-icon class="mr-2">mdi-content-save</v-icon>
          Enviar
        </v-btn>

      </v-form>
    </form-skeleton>
    
  </v-container>
</template>

<script>
import {get} from "@/services/abstract.service";

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
    sgUfServidorEstadual: [],
    idMunicipioServidorMunicipal: [],
    idOrgaoServidor: [],
    naoResideNoBrasil: false,
    loadingOrgaos: false,
    loadingUf: false,
    loadingMunicipio: false,
    showFields: {
      tp_esfera_servidor_militar: false,
      id_orgao_servidor: false,
      sg_uf_servidor_estadual: false,
      id_municipio_servidor_municipal: false
    }
  }),
  async mounted() {
    // await this.getUf();
    // await this.getOrgao();
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
    async getOrgao(params) {
      this.loadingOrgaos = true;
      const response = await get(`/orgao?search=bl_status_orgao:true${params}&pagination=false&orderBy=tx_nome_orgao&searchJoin=and`);
      this.idOrgaoServidor = response.data.data;
      this.loadingOrgaos = false;
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
      const tipoPoder = this.dataResponse.tp_poder_execut_legisl_judic;
      const tipoEsfera = this.dataResponse.tp_esfera_servidor_militar;

      this.showFields.id_orgao_servidor = false;
      this.showFields.sg_uf_servidor_estadual = false;
      this.showFields.id_municipio_servidor_municipal = false;
      
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
      this.dataResponse.sg_uf_servidor_estadual = [];
      this.dataResponse.id_municipio_servidor_municipal = [];
      this.dataResponse.id_orgao_servidor = [];
    }
  }
}
</script>

<style scoped>

</style>