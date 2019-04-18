<template>
    <div>
        <ul>
            <li class="archives-post-list__item" v-for="post of posts">
                <h4>{{post.title}}</h4>
                <div class="archives-post-list__corner-info">2017-03-15</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapModuleState} from '@/util/mapStateUtils';
    import {FETCH_POST_TITLES} from '@/store/action-types';


    export default {
        computed: {
            ...mapModuleState('archives', ['posts'])
        },
        async created() {
            await this.$store.dispatch(FETCH_POST_TITLES, {offset: 0, limit: 20})
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

            &:hover, &:hover * {
                background: $color-accent-dark;
            }

            > h4 {
                font-weight: 500;
                @extend %word-break;
            }
        }

        &__corner-info {
            font-size: 12px;
            display: flex;
            flex-direction: row-reverse;
            margin-top: 6px;
        }
    }

</style>
