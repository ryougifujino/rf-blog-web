import {
    FETCH_ALBUMS,
    CREATE_ALBUM
} from '@/store/action-types';
import {
    fetchAlbums,
    createAlbum
} from "@/api";
import {ADD_ALBUMS} from "@/store/mutation-types";

export default {
    async [FETCH_ALBUMS]({state, commit}) {
        if (state.albums.length !== 0) {
            return;
        }
        try {
            const {data: {items: albums}} = await fetchAlbums();
            commit(ADD_ALBUMS, {albums});
        } catch (e) {
            //TODO: handle error
            console.error(e);
        }
    },
    async [CREATE_ALBUM]({state, commit}, {newAlbumName}) {
        const {data: newAlbum} = await createAlbum(newAlbumName);
        state.albums.unshift(newAlbum);
    }
};
