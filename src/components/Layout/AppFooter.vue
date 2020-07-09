<template>
    <v-footer app class="justify-center">
        <span>
            &copy; {{ new Date().getFullYear() }} - Versão: {{version}}
        </span>
    </v-footer>
</template>

<script>
    import packageJson from "@/../package.json";
    export default {
        name: "AppFooter",
        data: () => ({
            environment: process.env.VUE_APP_AMBIENTE,
            version: packageJson.version
        })
    }
</script>

<style scoped>

</style>
