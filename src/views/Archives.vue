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

    .archives {
        display: flex;
        margin: 16px 0;

        &__post-list {
            flex: 2;
        }

        &__aside {
            flex: 1;
        }
    }

</style>