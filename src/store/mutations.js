import {
    ADD_ALBUMS
} from '@/store/mutation-types';

export default {
    [ADD_ALBUMS](state, {albums}) {
        state.albums.push(...albums);
    }
};