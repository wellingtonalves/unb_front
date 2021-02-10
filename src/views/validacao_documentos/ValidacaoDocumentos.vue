<template>
  <v-container>
    <template v-if="(!inscricao && !certificado)">
      <v-row>
        <v-col>
          <p>
            Preencha apenas o campo correspondente ao documento que você deseja validar. Não é necessário fazer login ou
            ter
            cadastro na EV.G.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h5>Dicas:</h5>
          <ul>
            <li>Digite corretamente as letras maiúsculas e minúsculas, pois isso interfere no reconhecimento do código.
            </li>
            <li>Atenção para não confundir o número “1” com a letra “L” minúscula ou a letra “o” com o número zero.</li>
          </ul>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="mt-8">
            <h3>Validar Inscrição</h3>
            <label>Informe o código do Comprovante de Inscrição:</label>
            <v-text-field
              v-model="codigoInscricao"
              :rules="rules.required"
              outlined
              required/>

            <v-btn large color="accent" :loading="loadingInscricao" :disabled="!codigoInscricao" @click="validarInscricao()">
              Verificar
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="mt-8">
            <h3>Validar Certificado</h3>
            <label>Informe o código do Certificado:</label>
            <v-text-field
              v-model="codigoCertificado"
              :rules="rules.required"
              outlined
              required/>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn large color="accent" :loading="loadingCertificado" :disabled="!codigoCertificado" @click="validarCertificado()">
            Verificar
          </v-btn>
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