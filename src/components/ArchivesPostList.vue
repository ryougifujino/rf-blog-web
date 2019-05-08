<template>
    <div>
        <ul>
            <li class="archives-post-list__item"
                v-for="post of filteredPosts"
                :key="post.id"
                @click="showPost(post.id)">
                <h4>{{post.title}}</h4>
                <div class="archives-post-list__corner-info">{{post.created_on | localDate}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import {FETCH_POST_TITLES} from '@/store/action-types';

    export default {
        computed: {
            ...mapGetters(['filteredPosts'])
        },
        methods: {
            ...mapActions([FETCH_POST_TITLES]),
            showPost(postId) {
                this.$router.push({path: `/post/${postId}`});
            }
        },
        created() {
            this[FETCH_POST_TITLES]();
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .archives-post-list {
        &__item {
            margin-bottom: 8px;
            cursor: pointer;
            border: 1px solid $text-color-secondary-light;
            border-radius: 16px;
            padding: 8px;

            @include sm("&:active, &:active *", "&:hover, &:hover *") {
                background: $color-background-dark;
            }

            > h4 {
                font-weight: 500;
                @extend %word-break;
                color: $text-color-primary-light;
            }
        }

        &__corner-info {
            font-size: 12px;
            display: flex;
            flex-direction: row-reverse;
            margin-top: 6px;
            color: $text-color-secondary;
        }
    }

</style>
