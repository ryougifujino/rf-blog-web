<template>
    <div class="archives-tag-board">
        <h3>标签</h3>
        <hr>
        <div class="archives-tag-board__container">
            <a class="archives-tag-board__tag" v-for="tag of tags">{{tag}}</a>
        </div>
    </div>
</template>

<script>
    import {FETCH_TAGS} from '@/store/action-types';
    import {mapModuleState} from '@/util/mapStateUtils';

    export default {
        computed: {
            ...mapModuleState('archives', ['tags'])
        },
        async created() {
            await this.$store.dispatch(FETCH_TAGS, {offset: 0, limit: 20})
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
            border-radius: 8px;
            border: 1px $color-line solid;
            background-color: $color-accent;
            padding: 4px 8px;
            margin: 8px 8px 0 0;
            cursor: pointer;

            &:hover{
                background: $color-accent-dark;
            }
        }
    }
</style>
