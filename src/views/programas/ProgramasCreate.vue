<template>
    <v-layout wrap>
        <card-default>
            <programas-form @update="update" :errors="errors">
                <template v-slot:buttons>
                    <v-btn class="mx-2" @click="$router.push('/programas')">
                        <v-icon class="mr-2">mdi-backup-restore</v-icon>
                        Voltar
                    </v-btn>

                    <v-btn class="mx-2" color="primary" :loading="loading" @click="save()">
                        <v-icon class="mr-2">mdi-content-save</v-icon>
                        Salvar
                    </v-btn>
                </template>
            </programas-form>
            <v-snackbar v-model="snackbar.active" :color="snackbar.color" :timeout="snackbar.timeout">
                {{snackbar.text}}
                <v-btn text @click.stop="snackbar.active = false">
                    Fechar
                </v-btn>
            </v-snackbar>
        </card-default>
    </v-layout>
</template>

<script>
    import ProgramasForm from "./ProgramasForm";
    import {create} from "@/services/abstract.service";

    export default {
        name: "ProgramasCreate",
        components: {ProgramasForm},
        data: () => ({
            data: '',
            loading: false,
            errors: [],
            snackbar: {
                active: false,
                color: '',
                text: '',
                timeout: 2000
            },
        }),
        watch: {
            'snackbar.active': function (val) {
                if (this.snackbar.color == 'success' && val == false) {
                    this.$router.push('/programas');
                }
            }
        },
        methods: {
            update(data) {
                this.data = data;
            },
            async save() {
                this.loading = true;
                const response = await create('programas', this.data)

                this.loading = false;

                if (response.errors) {
                    this.errors = response.errors;
                    this.snackbar.text = response.message;
                    this.snackbar.color = response.messageType;
                    this.snackbar.active = true;
                    return;
                }

                this.snackbar.text = response.data.message;
                this.snackbar.color = response.data.messageType;
                this.snackbar.active = true;
            }
        }
    }
</script>
