<template>
  <v-layout wrap>

    <card-default>
      <v-container class="pa-5" fluid>
        <permissao-form @update="update" :data="data" :errors="errors">
          <template v-slot:buttons>
            <v-btn class="mr-4" @click="$router.push('/permissoes')">
              <v-icon class="mr-2">mdi-backup-restore</v-icon>
              Voltar
            </v-btn>

            <v-btn class="mr-4" color="primary" :loading="loading" @click="save()">
              <v-icon class="mr-2">mdi-content-save</v-icon>
              Salvar
            </v-btn>
          </template>
        </permissao-form>
        
        <v-snackbar v-model="snackbar.active" :color="snackbar.color" :timeout="snackbar.timeout">
          {{snackbar.text}}
          <v-btn text @click.stop="snackbar.active = false">
            Fechar
          </v-btn>
        </v-snackbar>
      </v-container>
    </card-default>

  </v-layout>
</template>

<script>
  import PermissaoForm from "./PermissaoForm";
  import {get, update} from "@/services/abstract.service";
  export default {
    name: "PermissaoCreate",
    components: {PermissaoForm},
    data: () => ({
      data: '',
      loading: false,
      errors: [],
      snackbar: {
        active: false,
        color: '',
        text: '',
        timeout: 5000
      },
    }),
    watch: {
      'snackbar.active': function (val) {
        if (this.snackbar.color == 'success' && val == false) {
          this.$router.push('/permissoes');
        }
      }
    },
    async mounted() {
      await this.getData();
    },
    methods: {
      async getData() {
        const response = await get(`permissao/${this.$route.params.id}`);
        this.data = response.data.data;
      },
      update(data) {
        this.data = data;
      },
      async save() {
        this.loading = true;
        const response = await update(`permissao/${this.$route.params.id}`, this.data)

        this.loading = false;
        
        if (response.errors) {
          this.errors = response.errors;
          this.snackbar.text = response.message;
          this.snackbar.color = response.messageType;
          this.snackbar.active = true;
          return ;
        }

        this.snackbar.text = response.data.message;
        this.snackbar.color = response.data.messageType;
        this.snackbar.active = true;
      }
    }
  }
</script>
