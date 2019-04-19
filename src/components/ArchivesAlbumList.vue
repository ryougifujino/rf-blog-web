<template>
    <div class="archives-album-list" v-if="albums.length">
        <h3>专辑</h3>
        <hr>
        <ul>
            <li :class="itemClass(album.id)"
                v-for="album of albums"
                @click="checkAlbum(album)">{{album.name}}
            </li>
        </ul>
        <div></div>
    </div>
</template>

<script>
    import {FETCH_ALBUMS} from '@/store/action-types';
    import {mapState, mapActions, mapMutations} from 'vuex';
    import {ARCHIVES_CHECK_ALBUM} from "@/store/mutation-types";
    import {mapModuleState} from "@/util/mapStateUtils";

    export default {
        computed: {
            ...mapState(['albums']),
            ...mapModuleState('archives', ['checkedAlbumId']),
            itemClass() {
                return id => ['archives-album-list__item', {'archives-album-list__item--checked': id === this.checkedAlbumId}];
            }
        },
        methods: {
            ...mapActions([FETCH_ALBUMS]),
            ...mapMutations([ARCHIVES_CHECK_ALBUM]),
            checkAlbum(album) {
                this[ARCHIVES_CHECK_ALBUM](album.id);
            }
        },
        created() {
            this[FETCH_ALBUMS]().catch(() => this.$showToast('加载专辑失败'));
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

            &:hover, &--checked {
                text-decoration: underline;
            }
        }
    }

</style>
