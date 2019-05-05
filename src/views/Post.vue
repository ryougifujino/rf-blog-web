<template>
    <div class="post">
        <ThePostHeader class="post__header"></ThePostHeader>
        <div class="post__content">
            <MarkdownPreviewer class="post__markdown-preview"
                               :markdown-input="body">
            </MarkdownPreviewer>
            <div class="post__info-bar">
                <div class="post__tags">
                    <VTag class="post__tag" v-for="tag of tags" :key="tag.id">{{tag.name}}</VTag>
                </div>
                <div class="post__album" v-if="album">
                    <VIcon name="baseline-book-24px"></VIcon>
                    <span class="post__album-text">{{album.name}}</span>
                </div>
                <div class="post__created_on">
                    <span>{{isPrivate ? "私有" : ""}}</span>
                    <span>{{createdOn | localDate}}</span>
                </div>
            </div>
        </div>
        <PostComments></PostComments>
        <VProgressBar class="post__progress-bar"
                      v-if="isLoading"
                      transparent
                      colored>
        </VProgressBar>
    </div>
</template>

<script>
    import ThePostHeader from '@/components/ThePostHeader.vue';
    import MarkdownPreviewer from "@/components/MarkdownPreviewer.vue";
    import PostComments from "@/components/PostComments.vue";
    import {mapModuleState} from "@/util/mapStateUtils";
    import {mapActions} from "vuex";
    import {FETCH_POST} from "@/store/action-types";

    export default {
        components: {
            ThePostHeader,
            MarkdownPreviewer,
            PostComments
        },
        computed: {
            ...mapModuleState('post', ['title', 'body', 'isPrivate', 'album', 'createdOn',
                'isLoading', 'tags'])
        },
        methods: {
            ...mapActions([FETCH_POST])
        },
        created() {
            const postId = this.$route.params.id;
            this[FETCH_POST]({postId});
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/dimens";
    @import "~@/assets/styles/theme";

    .post {
        &__header {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
        }

        &__content {
            max-width: 850px;
            margin: ($view-header-height + 1) auto 0;
            padding: 16px;
        }

        &__markdown-preview {

        }

        &__info-bar {
            margin-top: 32px;
            border-bottom: 1px solid $color-accent-dark;
            padding-bottom: 16px;
        }

        &__tags {
            font-size: 0;
        }

        &__tag {
            font-size: 16px;
            margin: 8px 8px 0 0;
        }

        &__album {
            display: flex;
            align-items: center;
            margin-top: 16px;

            > .v-icon {
                margin-right: 4px;
                fill: $text-color-primary-light;
            }

            &-text {
                font-size: 18px;
                color: $text-color-primary-light;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        &__created_on {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            color: $text-color-primary-light;
        }

        &__progress-bar {
            position: fixed;
        }
    }
</style>
