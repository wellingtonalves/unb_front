<template>
    <div>
        <v-app-bar app>
            <div class="d-flex align-center">
                <v-img
                        alt="Vuetify Logo"
                        class="shrink mr-2"
                        contain
                        src="@/assets/logo.svg"
                        transition="scale-transition"
                        width="90"
                />

            </div>

            <v-spacer />

            <v-toolbar-title>
                Secretaria Virtual
            </v-toolbar-title>

            <v-spacer />

            <v-btn icon title="Notificações">
                <v-icon>mdi-bell</v-icon>
            </v-btn>

            <v-btn icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark" title="Modo Noturno">
                <v-icon v-if="$vuetify.theme.dark">mdi-invert-colors-off</v-icon>
                <v-icon v-else>mdi-invert-colors</v-icon>
            </v-btn>

            <v-menu offset-y>
                <template v-slot:activator="{ on }">

                    <v-btn text v-on="on">
                        <v-icon size="25" color="secondary">mdi-account</v-icon>
                        <div class="d-none d-md-flex align-center">
                            <h6>Olá, Alex Alexandre</h6>
                            <v-icon color="secondary">mdi-chevron-down</v-icon>
                        </div>
                    </v-btn>
                </template>

                <v-list nav dense>
                    <v-list-item v-for="(item, i) in items" :key="i">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>

                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider />

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Sair</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "AppBar",
        data: () => ({
            items: [
                { text: 'Meus dados', icon: 'mdi-home'},
                { text: 'Alterar e-mail', icon: 'mdi-email'},
                { text: 'Alterar senha', icon: 'mdi-lock'},
            ],
        }),
    }
</script>

<style scoped>

</style>
