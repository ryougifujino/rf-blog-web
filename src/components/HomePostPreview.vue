<template>
    <section>
        <h1>{{post.title}}</h1>
        <div v-html="bodyPreview">
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

<style>
    section {
        padding: 16px 0;
    }

    section h1 {
        margin-bottom: 16px;
    }

    section p {
        margin-bottom: 16px;
    }

    section > div{
        color: #212121;
    }
</style>