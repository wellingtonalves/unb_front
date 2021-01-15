<template>
    <form-skeleton :loading="loading">
        <v-form lazy-validation ref="form" v-show="!loading" v-model="validForm">
            <v-row>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-text-field
                            v-model="dataResponse.tx_nome_programa"
                            :error-messages="errorData.tx_nome_programa"
                            :rules="rules.required"
                            outlined
                            label="Nome do Programa"
                            required/>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-select v-model="dataResponse.id_modelo_certificado"
                              :error-messages="errorData.id_modelo_certificado"
                              :rules="rules.required"
                              outlined label="Modelo do Certificado" :items="modeloCertificado"
                              item-text="tx_nome_modelo_certificado"
                              item-value="id_modelo_certificado"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-menu
                            v-model="inicioValidadePopUp"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="computedDataInicioValidade"
                                    :error-messages="errorData.dt_inicio_validade"
                                    outlined
                                    label="Data de início da oferta"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dataResponse.dt_inicio_validade" @input="inicioValidadePopUp = false"
                                       locale="pt-BR"/>
                    </v-menu>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-menu
                            v-model="terminoValidadePopUp"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="computedDataTerminoValidade"
                                    :error-messages="errorData.dt_termino_validade"
                                    outlined
                                    label="Data de término da oferta"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dataResponse.dt_termino_validade" @input="terminoValidadePopUp = false"
                                       locale="pt-BR"/>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select v-model="dataResponse.tp_situacao_programa"
                              :error-messages="errorData.tp_situacao_programa"
                              outlined label="Origem da Oferta" :items="situacaoPrograma" item-text="label"
                              item-value="value"/>
                </v-col>
                <v-col>
                    <v-text-field
                            v-model="dataResponse.qt_carga_horaria"
                            :error-messages="errorData.qt_carga_horaria"
                            :rules="rules.required"
                            outlined
                            type="number"
                            label="Carga horária do programa"
                            required/>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-autocomplete
                            v-model="dataResponse.programa_curso"
                            :items="cursos"
                            outlined
                            dense
                            chips
                            small-chips
                            item-text="tx_nome_curso"
                            label="Cursos do Programa"
                            multiple
                            return-object
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <span>Público-alvo</span>
                    <ckeditor :editor="editor" v-model="dataResponse.tx_publico_alvo"></ckeditor>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <span>Apresentação</span>
                    <ckeditor :editor="editor" v-model="dataResponse.tx_apresentacao"></ckeditor>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <span>Orientação</span>
                    <ckeditor :editor="editor" v-model="dataResponse.tx_orientacao"></ckeditor>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex" cols="12">
                    <v-text-field
                            v-model="dataResponse.tx_url_imagem"
                            :error-messages="errorData.tx_url_imagem"
                            :rules="rules.required"
                            outlined
                            label="URL da imagem"
                            required/>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select v-model="dataResponse.bl_programa_destaque"
                              :error-messages="errorData.bl_programa_destaque"
                              :rules="rules.required"
                              outlined label="Programa destaque" :items="situacaoDestaque"
                              item-text="label"
                              item-value="value"/>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select v-model="dataResponse.id_criterio_programa"
                              :error-messages="errorData.id_criterio_programa"
                              :rules="rules.required"
                              outlined label="Critério do Programa" :items="criterios"
                              item-text="tx_criterio_descricao"
                              item-value="id_criterio"/>
                </v-col>
            </v-row>

            <v-row class="mt-5" justify="center">
                <slot name="buttons"></slot>
            </v-row>

        </v-form>
    </form-skeleton>
</template>

<script>
    import {get} from "@/services/abstract.service";
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    export default {
        name: "AvaForm",
        props: ['data', 'errors'],
        data: () => ({
            loading: true,
            validForm: false,
            dataResponse: {} || this.data,
            errorData: {},
            rules: {
                required: [v => !!v || 'Campo obrigatório'],
            },
            modeloCertificado: [],
            criterios: [],
            inicioValidadePopUp: false,
            terminoValidadePopUp: false,
            situacaoPrograma: [
                {
                    label: 'Ativo',
                    value: 'A'
                },
                {
                    label: 'Inativo',
                    value: 'I'
                },
            ],
            situacaoDestaque: [
                {
                    label: 'Sim',
                    value: 1
                },
                {
                    label: 'Não',
                    value: 0
                },
            ],
            cursos: [],
            editor: ClassicEditor
        }),
        computed: {
            computedDataInicioValidade() {
                return this.formatDate(this.dataResponse.dt_inicio_validade)
            },
            computedDataTerminoValidade() {
                return this.formatDate(this.dataResponse.dt_termino_validade)
            },
        },
        watch: {
            dataResponse: function (val) {
                this.$emit('update', val);
            },
            errors: function (val) {
                this.errorData = val;
            },
            data: function (val) {
                this.dataResponse = val;
            }
        },
        async mounted() {
            await this.getCursos();
            await this.getModeloCertificado();
            await this.getCriterioPrograma();
            this.loading = false
        },
        methods: {
            async getCursos() {
                return get('/curso?pagination=false').then(response => {
                    this.cursos = response.data.data
                })
            },
            async getCriterioPrograma() {
                return get('/criterio-programa?pagination=false').then(response => {
                    this.criterios = response.data.data
                })
            },
            async getModeloCertificado() {
                return get('/modelo-certificado?pagination=false').then(response => {
                    this.modeloCertificado = response.data.data
                })
            },
            formatDate(date) {
                if (!date) return null

                const [year, month, day] = date.split('-');
                return `${day}/${month}/${year}`
            }
        }
    }
</script>
