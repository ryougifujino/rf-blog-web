<template>
    <div class="archives-tag-board">
        <h3>标签</h3>
        <hr>
        <div class="content">
            <a v-for="tag of tags">{{tag}}</a>
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

<style lang="scss" scoped>
    @import "~@/assets/styles/theme";

    * {
        background-color: $color-accent-dark;
        color: $text-color-primary-light;
    }

    hr {
        border-color: $color-line;
        margin-top: 12px;
        padding-bottom: 4px;
    }

    .archives-tag-board {
        padding: 12px;
        border-radius: 16px;
        margin-top: 16px;
    }

    .archives-tag-board > .content {
        display: flex;
        flex-wrap: wrap;
    }

    h3, a {
        background-color: $color-accent-dark;
    }

    a {
        border-radius: 8px;
        border: 1px $color-line solid;
        background-color: $color-accent;
        padding: 4px 8px;
        margin: 8px 8px 0 0;
        cursor: pointer;
    }
</style>