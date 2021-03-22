<template>
  <v-container>
    <v-row>
      <v-col align-self="center" :cols="3" v-for="instituicao in instituicoesParticipantes" :key=instituicao.id_orgao>
        <a :href="instituicao.tx_link_orgao" target="_blank">
          <v-img width="200px" v-if="instituicao.tx_url_imagem_orgao" :src="instituicao.tx_url" :alt="instituicao.tx_nome_orgao"/>
          <p>{{instituicao.tx_nome_orgao}}</p>
        </a>
      </v-col>
    </v-row>
    
  </v-container>
</template>


<script>

  import {get} from "@/services/abstract.service";

  export default {
    name: 'InstituicoesParticipantes',
    data() {
      return{
        instituicoesParticipantes: []
      }
    },
    async mounted() {
      await this.getInstituicoesParticipantes();
    },
    methods: {
      async getInstituicoesParticipantes(){
        const response = await get('/orgao?pagination=false');
        this.instituicoesParticipantes = response.data.data;
      }
    }
  }
</script>
