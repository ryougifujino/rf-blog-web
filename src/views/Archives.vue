<template>
    <main class="archives">
        <ArchivesPostList class="archives__post-list"/>
        <aside class="archives__aside">
            <ArchivesAlbumList/>
            <ArchivesTagBoard/>
        </aside>
    </main>
</template>

<script>
    import ArchivesPostList from '@/components/ArchivesPostList.vue';
    import ArchivesAlbumList from '@/components/ArchivesAlbumList.vue';
    import ArchivesTagBoard from '@/components/ArchivesTagBoard.vue';

    export default {
        components: {
            ArchivesPostList,
            ArchivesAlbumList,
            ArchivesTagBoard
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/mixins";

    .archives {
        @extend %width-limit;
        display: flex;
        flex-wrap: wrap;
        margin: 16px auto;
        padding: 0 16px;

        $list-min-width: 300px;
        $aside-min-width: 200px;
        $space: 16px;

        &__post-list {
            flex: $list-min-width;
            @media (min-width: $list-min-width + $aside-min-width + $space) {
                margin-right: $space;
            }
        }

        &__aside {
            flex: $aside-min-width;
        }
    }

</style>
