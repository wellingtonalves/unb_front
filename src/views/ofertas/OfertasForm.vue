<template>
    <form-skeleton :loading="loading">
        <v-form lazy-validation ref="form" v-show="!loading" v-model="validForm">
            <v-row>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-select v-model="dataResponse.id_tipo_oferta" :error-messages="errorData.id_tipo_oferta"
                              :rules="rules.required"
                              outlined label="Tipo da Oferta" :items="tipoOferta" item-text="tx_nome_tipo_oferta"
                              item-value="id_tipo_oferta"/>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select v-model="dataResponse.id_ava" :error-messages="errorData.id_ava" :rules="rules.required"
                              outlined label="AVA" :items="ava" item-text="tx_nome_ava" item-value="id_ava"/>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-select v-model="dataResponse.id_curso" :error-messages="errorData.id_curso"
                              :rules="rules.required"
                              outlined label="Curso da Oferta" :items="cursos" item-text="tx_nome_curso"
                              item-value="id_curso"/>
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
                    <v-text-field
                            v-model="dataResponse.tx_nome_oferta"
                            :error-messages="errorData.tx_nome_oferta"
                            :rules="rules.required"
                            outlined
                            label="Nome da Oferta"
                            required/>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-text-field
                            v-model="dataResponse.tx_nome_curso"
                            :error-messages="errorData.tx_nome_curso"
                            :rules="rules.required"
                            outlined
                            label="Nome do Curso"
                            required/>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                            v-model="dataResponse.qt_carga_horaria_oferta"
                            :error-messages="errorData.qt_carga_horaria_oferta"
                            :rules="rules.required"
                            outlined
                            type="number"
                            label="Carga horária da oferta"
                            required/>
                </v-col>

                <v-col>
                    <v-text-field
                            v-model="dataResponse.qt_carga_horaria_minima"
                            :error-messages="errorData.qt_carga_horaria_minima"
                            :rules="rules.required"
                            outlined
                            type="number"
                            label="Carga horária mínima"
                            required/>
                </v-col>
                <v-col>
                    <v-text-field
                            v-model="dataResponse.qt_vagas"
                            :error-messages="errorData.qt_vagas"
                            :rules="rules.required"
                            outlined
                            type="number"
                            label="Quantidade de vagas"/>
                </v-col>
                <v-col class="d-flex">
                    <v-select v-model="dataResponse.tp_com_tutoria" :error-messages="errorData.tp_com_tutoria"
                              :rules="rules.required"
                              outlined label="Oferta com tutoria" :items="tiposBolean" item-text="label"
                              item-value="value"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-menu
                            v-model="inicioOfertaPopUp"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="computedDataInicioOferta"
                                    :error-messages="errorData.dt_inicio_oferta"
                                    outlined
                                    label="Data de início da oferta"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dataResponse.dt_inicio_oferta" @input="inicioOfertaPopUp = false"
                                       locale="pt-BR"/>
                    </v-menu>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-menu
                            v-model="terminoOfertaPopUp"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="computedDataTerminoOferta"
                                    :error-messages="errorData.dt_termino_oferta"
                                    outlined
                                    label="Data de término da oferta"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dataResponse.dt_termino_oferta" @input="terminoOfertaPopUp = false"
                                       locale="pt-BR"/>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row v-if="dataResponse.id_tipo_oferta === 4">
                <v-col class="d-flex" cols="12" sm="6">
                    <v-menu
                            v-model="inicioInscricaoPopUp"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="computedDataInicioInscricao"
                                    :error-messages="errorData.dt_inicio_inscricao"
                                    outlined
                                    label="Data de início da inscrição"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dataResponse.dt_inicio_inscricao" @input="inicioInscricaoPopUp = false"
                                       locale="pt-BR"/>
                    </v-menu>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-menu
                            v-model="terminoInscricaoPopUp"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="computedDataTerminoInscricao"
                                    :error-messages="errorData.dt_termino_inscricao"
                                    outlined
                                    label="Data de término da inscrição"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dataResponse.dt_termino_inscricao"
                                       @input="terminoInscricaoPopUp = false"
                                       locale="pt-BR"/>
                    </v-menu>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-menu
                            v-model="inicioSelecaoPopUp"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="computedDataInicioSelecao"
                                    :error-messages="errorData.dt_inicio_selecao"
                                    outlined
                                    label="Data de início da seleção"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dataResponse.dt_inicio_selecao" @input="inicioSelecaoPopUp = false"
                                       locale="pt-BR"/>
                    </v-menu>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-menu
                            v-model="terminoSelecaoPopUp"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="computedDataTerminoSelecao"
                                    :error-messages="errorData.dt_termino_selecao"
                                    outlined
                                    label="Data de término da seleção"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dataResponse.dt_termino_selecao" @input="terminoSelecaoPopUp = false"
                                       locale="pt-BR"/>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                            v-model="dataResponse.qt_nota_minima_aprovacao"
                            :error-messages="errorData.qt_nota_minima_aprovacao"
                            :rules="rules.required"
                            outlined
                            type="number"
                            label="Nota mínima"/>
                </v-col>
                <v-col class="d-flex">
                    <v-select v-model="dataResponse.tp_situacao_oferta" :error-messages="errorData.tp_situacao_oferta"
                              :rules="rules.required"
                              outlined label="Situação da Oferta" :items="situacaoOferta" item-text="label"
                              item-value="value"/>
                </v-col>
                <v-col class="d-flex">
                    <v-select v-model="dataResponse.tp_tipo_turma" :error-messages="errorData.tp_tipo_turma"
                              outlined label="Status da Oferta" :items="statusOferta" item-text="label"
                              item-value="value"/>
                </v-col>
                <v-col class="d-flex">
                    <v-select v-model="dataResponse.id_parceiros" :error-messages="errorData.id_parceiros"
                              outlined label="Conteudista" :items="parceiros" item-text="tx_nome_parceiros"
                              item-value="id_parceiros"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                            v-model="dataResponse.qt_duracao_dias"
                            :error-messages="errorData.qt_duracao_dias"
                            outlined
                            type="number"
                            label="Disponibilidade"
                            required/>
                </v-col>
                <v-col class="d-flex">
                    <v-select v-model="dataResponse.id_certificador" :error-messages="errorData.id_certificador"
                              outlined label="Certificador" :items="certificadores" item-text="tx_nome_parceiros"
                              item-value="id_parceiros"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <span>Público algo</span>
                    <ckeditor :editor="editor" v-model="dataResponse.tx_publico_algo"></ckeditor>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select v-model="dataResponse.tp_origem_oferta" :error-messages="errorData.tp_origem_oferta"
                              outlined label="Origem da Oferta" :items="origemOferta" item-text="label"
                              item-value="value"/>
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
            tipoOferta: [],
            ava: [],
            cursos: [],
            modeloCertificado: [],
            tiposBolean: [
                {
                    label: 'Sim',
                    value: 'S'
                },
                {
                    label: 'Não',
                    value: 'N'
                },
            ],
            inicioOfertaPopUp: false,
            terminoOfertaPopUp: false,
            inicioInscricaoPopUp: false,
            terminoInscricaoPopUp: false,
            inicioSelecaoPopUp: false,
            terminoSelecaoPopUp: false,
            situacaoOferta: [
                {
                    label: 'EM CURSO',
                    value: 'EM_CURSO'
                },
                {
                    label: 'CONCLUÍDA',
                    value: 'CONCLUIDA'
                },
                {
                    label: 'PUBLICADA',
                    value: 'PUBLICADA'
                },
            ],
            statusOferta: [
                {
                    label: 'ATIVO',
                    value: 'A'
                },
                {
                    label: 'INATIVO',
                    value: 'I'
                },
            ],
            origemOferta: [
                {
                    label: 'MIGRADO_WEBCEF',
                    value: 'MIGRADO_WEBCEF'
                },
                {
                    label: 'ENAP',
                    value: 'ENAP'
                },
                {
                    label: 'MIGRADO',
                    value: 'MIGRADO'
                },
            ],
            parceiros: [],
            certificadores: [],
            editor: ClassicEditor
        }),
        computed: {
            computedDataInicioOferta() {
                return this.formatDate(this.dataResponse.dt_inicio_oferta)
            },
            computedDataTerminoOferta() {
                return this.formatDate(this.dataResponse.dt_termino_oferta)
            },
            computedDataInicioInscricao() {
                return this.formatDate(this.dataResponse.dt_inicio_inscricao)
            },
            computedDataTerminoInscricao() {
                return this.formatDate(this.dataResponse.dt_termino_inscricao)
            },
            computedDataInicioSelecao() {
                return this.formatDate(this.dataResponse.dt_inicio_selecao)
            },
            computedDataTerminoSelecao() {
                return this.formatDate(this.dataResponse.dt_termino_selecao)
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
            },
            'dataResponse.id_tipo_oferta': function (val) {
                if (val !== 4) {
                    this.dataResponse.dt_inicio_inscricao = ''
                    this.dataResponse.dt_termino_inscricao = ''
                    this.dataResponse.dt_inicio_selecao = ''
                    this.dataResponse.dt_termino_selecao = ''
                }
            }
        },
        async mounted() {
            await this.getTipoOferta();
            await this.getAva();
            await this.getCursos();
            await this.getModeloCertificado();
            await this.getParceiros();
            await this.getCertificadores();
            this.loading = false
        },
        methods: {
            async getTipoOferta() {
                return get('/tipo-oferta?pagination=false').then(response => {
                    this.tipoOferta = response.data.data
                })
            },
            async getAva() {
                return get('/ava?pagination=false').then(response => {
                    this.ava = response.data.data
                })
            },
            async getCursos() {
                return get('/curso?pagination=false').then(response => {
                    this.cursos = response.data.data
                })
            },
            async getModeloCertificado() {
                return get('/modelo-certificado?pagination=false').then(response => {
                    this.modeloCertificado = response.data.data
                })
            },
            async getParceiros() {
                return get('/parceiros?pagination=false&search=id_tipo_parceiros:1').then(response => {
                    this.parceiros = response.data.data
                })
            },
            async getCertificadores() {
                return get('/parceiros?pagination=false&search=id_tipo_parceiros:2').then(response => {
                    this.certificadores = response.data.data
                })
            },
            formatDate(date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            }
        }
    }
</script>
