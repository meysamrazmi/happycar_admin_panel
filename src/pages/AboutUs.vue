<template>
    <div>
        <div class="row">
            <phone></phone>
            <social></social>
            <description></description>
        </div>
    </div>
</template>

<script>
    import Phone from './AboutUs/Phone';
    import Social from './AboutUs/Social';
    import Description from './AboutUs/Description';

    export default {
        name: "about-us",
        components: {
            Phone,
            Social,
            Description
        },
        data() {
            return {}
        },
        computed: {

        },

        mounted() {

        },

        methods: {

        }
    }
</script>

<style scoped>

</style>