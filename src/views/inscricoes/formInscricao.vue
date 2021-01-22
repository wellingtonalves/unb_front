<template>
  <v-container>
    <card-default>
      <form-skeleton :loading="loading">
        <v-form lazy-validation ref="form" v-model="validForm" v-show="!loading">

          <h3>Dados Profissionais</h3>
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select v-model="dataResponse.tp_servidor_militar_cidadao" :error-messages="errorData.tp_servidor_militar_cidadao"
                        :items="tpServidorMilitarCidadao" outlined label="Você é..." item-text="label" item-value="value" />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-select v-model="dataResponse.tp_poder_execut_legisl_judic" :error-messages="errorData.tp_poder_execut_legisl_judic"
                        :items="tpPoderExectLegislJudic" outlined label="De qual poder?" item-text="label" item-value="value" />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-select v-model="dataResponse.tp_esfera_servidor_militar" :error-messages="errorData.tp_esfera_servidor_militar"
                        :items="tpEsferaServidorMilitar" outlined label="De qual esfera?" item-text="label" item-value="value" />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-select v-model="dataResponse.sg_uf_servidor_estadual" :error-messages="errorData.sg_uf_servidor_estadual"
                        :items="sgUfServidorEstadual" outlined label="De qual UF?" item-text="tx_nome_uf" item-value="sg_uf" @change="getMunicipio()"/>
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-select v-model="dataResponse.id_municipio_servidor_municipal" :error-messages="errorData.id_municipio_servidor_municipal"
                        :items="idMunicipioServidorMunicipal" outlined label="De qual Município?" item-text="tx_nome_municipio" item-value="id_municipio" />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-col>
                <span>
                  As informações deste campo são disponibilizadas pelo Sistema de Informações Organizacionais do Governo Federal.
                            Caso não encontre a informação que deseje na relação, utilize o órgão imediatamente superior.
                </span>
              </v-col>
              <v-col>
                <v-select v-model="dataResponse.id_orgao_servidor" :error-messages="errorData.id_orgao_servidor"
                          :items="idOrgaoServidor" outlined label="De qual órgão?" item-text="tx_nome_orgao" item-value="id_orgao" />
              </v-col>
              
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-select v-model="dataResponse.tp_ocupa_cargo_funcao" :error-messages="errorData.tp_ocupa_cargo_funcao"
                        :items="tpOcupaCargoFuncao" outlined label="Você ocupa função comissionada?" item-text="label" item-value="value" />
            </v-col>

            <v-col>
<!--              TODO -- essa lista deverá ser filtrada e não está de acordo com os dados de produção-->
              <v-select v-model="dataResponse.tp_empregado_terceiro_setor" :error-messages="errorData.tp_empregado_terceiro_setor"
                        :items="idOrgaoServidor" outlined label="De qual empresa?" item-text="tx_nome_orgao" item-value="id_orgao" />
            </v-col>


            <v-col class="d-flex" cols="12" sm="6">
              <v-select v-model="dataResponse.tp_sem_vinculo" :error-messages="errorData.tp_sem_vinculo"
                        :items="tpSemVinculo" outlined label="Selecione sua situação:" item-text="label" item-value="value" />
            </v-col>
            
          </v-row>
          

          <h3>Endereço</h3>
          <v-row>

          </v-row>

        </v-form>
      </form-skeleton>
    </card-default>
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
  }),
  async mounted() {
    await this.getUf();
    await this.getOrgao();
  },
  methods: {
    async getUf() {
      const response = await get('/uf?pagination=false');
      this.sgUfServidorEstadual = response.data.data;
    },
    async getMunicipio() {
      const response = await get(`/municipio?pagination=false&search=sg_uf:${this.dataResponse.sg_uf_servidor_estadual}`);
      this.idMunicipioServidorMunicipal = response.data.data;
    },
    async getOrgao() {
      const response = await get('/orgao?search=bl_status_orgao:true&pagination=false&orderBy=tx_nome_orgao');
      this.idOrgaoServidor = response.data.data;
    }
  }
}
</script>

<style scoped>

</style>