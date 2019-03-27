<template>
    <div class="album-list">
        <h3>专辑</h3>
        <hr>
        <ul>
            <li class="album-list__item" v-for="album of albums">{{album.name}}</li>
        </ul>
        <div></div>
    </div>
</template>

<script>
    import {FETCH_ALBUMS} from '@/store/action-types';
    import {mapModuleState} from '@/util/mapStateUtils';

    export default {
        computed: {
            ...mapModuleState('archives', ['albums'])
        },
        async created() {
            await this.$store.dispatch(FETCH_ALBUMS, {offset: 0, limit: 20})
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .album-list {
        padding: 12px;
        border-radius: 16px;
        border: 1px solid $color-line;
        color: $text-color-primary-light;

        > hr {
            border-color: $color-line;
            margin-top: 12px;
            padding-bottom: 4px;
        }

        &__item {
            cursor: pointer;
            margin: 8px 0 0;
        }
    }

</style>