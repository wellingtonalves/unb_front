<template>
  <v-container>
    <v-layout wrap>
      <div class="flex-item" v-for="instituicao in instituicoesParticipantes" :key=instituicao.id_orgao>
        <a :href="instituicao.tx_link_orgao" target="_blank">
          <v-img width="200px" v-if="instituicao.tx_url_imagem_orgao" :src="instituicao.tx_url" :alt="instituicao.tx_nome_orgao"/>
          <span>{{ instituicao.tx_nome_orgao }}</span>
        </a>
      </div>
    </v-layout>
    
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

<style>
.layout .flex-item {
  background-color: var(--v-white-base);
  box-shadow: 0 0 20px rgb(0 0 0 / 5%);
  flex-basis: 220px;
  flex-grow: 1;
  margin: 10px;
}
.layout .flex-item a {
  color: var(--v-darkgrey-base);
  display: block;
  line-height: 1.2em;
  padding: 40px 30px;
  text-align: center;
  text-decoration: none;
}
.layout .flex-item .v-image {
  margin: 0 auto;
  max-height: 60px;
  max-width: 400px;
}
.layout .flex-item .v-image__image {
  background-size: contain;
}
.layout .flex-item span {
  display: block;
  font-weight: 300;
  line-height: 1.2em;
  padding-top: 20px;
}
</style>
