<template>
    <div class="archives-tag-board" v-if="tags.length">
        <h3>标签</h3>
        <hr>
        <div class="archives-tag-board__container">
            <VTag v-for="tag of tags"
                  :key="tag.id"
                  :class="['archives-tag-board__tag', {'archives-tag-board__tag--checked': tag.id === checkedTagId}]"
                  @click.native="checkTag(tag)">{{tag.name}}
            </VTag>
        </div>
    </div>
</template>

<script>
    import {FETCH_TAGS} from '@/store/action-types';
    import {ARCHIVES_CHECK_TAG} from '@/store/mutation-types'
    import {mapState, mapActions, mapMutations} from 'vuex';
    import {mapModuleState} from "@/util/mapStateUtils";

    export default {
        computed: {
            ...mapState(['tags']),
            ...mapModuleState('archives', ['checkedTagId'])
        },
        methods: {
            ...mapActions([FETCH_TAGS]),
            ...mapMutations([ARCHIVES_CHECK_TAG]),
            checkTag(tag) {
                this[ARCHIVES_CHECK_TAG](tag.id);
            }
        },
        created() {
            this[FETCH_TAGS]().catch(() => this.$showToast('加载标签失败'));
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .archives-tag-board {
        padding: 12px;
        border-radius: 16px;
        margin-top: 16px;
        background-color: $color-accent-dark;
        color: $text-color-primary-light;

        > h3 {
            background-color: inherit;
        }

        > hr {
            border-color: $color-line;
            margin-top: 12px;
            padding-bottom: 4px;
            background-color: inherit;
        }

        &__container {
            display: flex;
            flex-wrap: wrap;
            background-color: inherit;
        }

        &__tag {
            margin: 8px 8px 0 0;

            &:hover, &--checked {
                background: $color-accent-dark;
            }

            &--checked {
                color: $text-color-primary-light !important;
                border-color: $text-color-primary-light !important;
            }
        }
    }
</style>
