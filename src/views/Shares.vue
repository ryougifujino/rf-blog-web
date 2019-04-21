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
        padding: 0 16px 16px;
    }
</style>