<template>
  <v-container>
    <template v-if="(!inscricao && !certificado)">

      <p>
        Preencha apenas o campo correspondente ao documento que você deseja validar. Não é necessário fazer login ou
        ter cadastro na EV.G.
      </p>
        
      <h3>Dicas:</h3>
      <ul>
        <li>Digite corretamente as letras maiúsculas e minúsculas, pois isso interfere no reconhecimento do código.
        </li>
        <li>Atenção para não confundir o número “1” com a letra “L” minúscula ou a letra “o” com o número zero.</li>
      </ul>

      <v-row class="mt-8">
        <v-col cols="12" sm="6">
        
          <fieldset class="custom-fieldset">
            
            <legend>Validar Inscrição</legend>
            <v-text-field
              v-model="codigoInscricao"
              label="Informe o código do Comprovante de Inscrição"
              :rules="rules.required"
              outlined
              required/>

            <v-btn large color="accent" :loading="loadingInscricao" :disabled="!codigoInscricao" @click="validarInscricao()">
              Verificar
            </v-btn>
                
          </fieldset>

        </v-col>

        <v-col cols="12" sm="6">

          <fieldset class="custom-fieldset">
            
            <legend>Validar Certificado</legend>
            <v-text-field
              v-model="codigoCertificado"
              label="Informe o código do Certificado"
              :rules="rules.required"
              outlined
              required/>

            <v-btn large color="accent" :loading="loadingCertificado" :disabled="!codigoCertificado" @click="validarCertificado()">
              Verificar
            </v-btn>
          
          </fieldset>

        </v-col>
      </v-row>

    </template>
    <v-row>
      <v-col>
        <visualizacao-inscricao :data="inscricao" v-if="inscricao" @close="close()"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <visualizacao-certificado :data="certificado" v-if="certificado" @close="close()"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VisualizacaoCertificado from './components/VisualizacaoCertificado';
import VisualizacaoInscricao from './components/VisualizacaoInscricao';
import {get} from "@/services/abstract.service";

export default {
  name: "ValidacaoDocumentos",
  components: {VisualizacaoCertificado, VisualizacaoInscricao},
  data() {
    return {
      rules: {
        required: [v => !!v || 'Campo obrigatório'],
      },
      inscricao: null,
      certificado: null,
      codigoInscricao: null,
      codigoCertificado: null,
      loadingInscricao: false,
      loadingCertificado: false,
    }
  },
  mounted() {
    if(this.$route.query.codigo_validador){
      this.codigoCertificado = this.$route.query.codigo_validador;
      this.validarCertificado();
    }
  },
  methods: {
    async validarInscricao() {
      this.inscricao = null;
      this.loadingInscricao = true;
      let response = await get('inscricao/validar/' + this.codigoInscricao);
      this.loadingInscricao = false;
      if (!response.data) {
        return false;
      }

      this.inscricao = response.data.data;
    },
    async validarCertificado() {
      this.certificado = null;
      this.loadingCertificado = true;
      let response = await get('certificado/validar/' + this.codigoCertificado);
      this.loadingCertificado = false;
      if (!response.data) {
        return false;
      }

      this.certificado = response.data.data;
    },
    close() {
      this.inscricao = null;
      this.certificado = null;
    }
  }
}
</script>