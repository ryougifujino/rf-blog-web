<template>
    <div class="shares">
        <ShareList/>
    </div>
</template>

<script>
    import ShareList from "@/components/ShareList.vue";

    export default {
        components: {
            ShareList
        }
    }
</script>

<style>
    .shares{
        width: 60%;
        margin: 0 auto 16px;
    }
</style>