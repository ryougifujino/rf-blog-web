<template>
    <main>
        <ArchivesPostList class="archives-posts"/>
        <aside class="archives-aside">
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

<style>
    main {
        display: flex;
        margin: 16px 0;
    }

    .archives-posts {
        flex: 2;
    }

    .archives-aside {
        flex: 1;
    }

</style>