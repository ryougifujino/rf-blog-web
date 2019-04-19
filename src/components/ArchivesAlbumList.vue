<template>
    <div class="archives-album-list" v-if="albums.length">
        <h3>专辑</h3>
        <hr>
        <ul>
            <li class="archives-album-list__item" v-for="album of albums">{{album.name}}</li>
        </ul>
        <div></div>
    </div>
</template>

<script>
    import {FETCH_ALBUMS} from '@/store/action-types';
    import {mapState, mapActions} from 'vuex';

    export default {
        computed: {
            ...mapState(['albums'])
        },
        methods: {
            ...mapActions([FETCH_ALBUMS])
        },
        async created() {
            await this[FETCH_ALBUMS]();
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .archives-album-list {
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
            @extend %word-break;

            &:hover {
                text-decoration: underline;
            }
        }
    }

</style>
