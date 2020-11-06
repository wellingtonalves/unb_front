<template>
    <v-card width="100%" elevation="10" :loading="loading">
        <v-container class="pa-5" fluid>
            <slot></slot>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "CardComponent",
        props: {
            loading: {
                required: false,
                default: false
            }
        },
        data() {
            return {
                attrs: {
                    class: 'mb-6',
                    boilerplate: true,
                    elevation: 2,
                },
            }
        }
    }
</script>

<style scoped>

</style>
