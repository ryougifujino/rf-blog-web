<template>
    <section>
        <h2 class="title-text">{{post.title}}</h2>
        <div class="body-text">
            {{bodyPreview}}
        </div>
    </section>
</template>

<script>
    const BODY_MAX_LENGTH = 200;

    export default {
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        computed: {
            bodyPreview() {
                return this.post.body.substring(0, BODY_MAX_LENGTH);
            }
        }
    }
</script>

<style scoped>
    section {
        padding: 16px;
    }

    section h2 {
        margin-bottom: 16px;
    }

</style>