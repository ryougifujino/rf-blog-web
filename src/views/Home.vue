<template>
    <div>
        <HomePostPreview v-for="post of posts" :post="post"/>
    </div>
</template>

<script>
    import HomePostPreview from '../components/HomePostPreview.vue';

    export default {
        components: {
            HomePostPreview
        },
        computed: {
            posts() {
                return []
            }
        }
    }
</script>

<style>

</style>