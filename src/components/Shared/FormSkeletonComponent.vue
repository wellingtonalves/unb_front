<template>
    <div>
        <v-skeleton-loader v-if="loading"
                           v-bind="attrs"
                           type="article,list-item-three-line, actions"
        >
        </v-skeleton-loader>
        <slot></slot>
        <div class="d-flex justify-center">
            <v-progress-circular
                    v-if="loading"
                    indeterminate
                    color="primary"
            ></v-progress-circular>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormSkeletonComponent",
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
                    boilerplate: false,
                    elevation: 2,
                },
            }
        }
    }
</script>

<style scoped>

</style>
