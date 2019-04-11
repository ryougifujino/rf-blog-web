<template>
    <div class="albums-select" @click.self="toggleContent">
        <span class="albums-select__value"
              @click="toggleContent">{{value ? value.name : "未选择"}}</span>
        <div class="albums-select__content" v-show="isContentVisible">
            <div class="albums-select__search">
                <input placeholder="查找专辑" spellcheck="false" v-model="albumKey">
            </div>
            <div class="albums-select__list-container">
                <div class="albums-select__add">
                    <VProgressBar v-if="isAdding"></VProgressBar>
                    <div class="albums-select__add-button"
                         v-if="!isAddInputVisible"
                         @click="isAddInputVisible = true">新增专辑
                    </div>
                    <div v-if="isAddInputVisible">
                        <div :class="addMessageClass" v-if="addMessage">{{addMessage}}</div>
                        <input class="albums-select__add-input"
                               placeholder="添加新专辑"
                               spellcheck="false"
                               maxlength="200"
                               v-model="newAlbumName">
                        <div class="albums-select__add-footer">
                            <VButtonFlat @click.native="addCancel">取消</VButtonFlat>
                            <VButtonFlat @click.native="addConfirm">确认</VButtonFlat>
                        </div>
                    </div>
                </div>
                <ul class="albums-select__list">
                    <li @click="selectItem(null)">未选择</li>
                    <li v-for="album of filteredAlbums" @click="selectItem(album)">{{album.name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {FETCH_ALBUMS, CREATE_ALBUM} from '@/store/action-types';
    import {mapState, mapActions} from 'vuex'

    export default {
        props: {
            value: {
                types: [Object, null],
                required: true
            }
        },
        data: () => ({
            isContentVisible: false,
            isAddInputVisible: false,
            albumKey: '',
            newAlbumName: '',
            addMessage: '',
            addMessageType: 'error',
            isAdding: false
        }),
        methods: {
            toggleContent() {
                this.isContentVisible = !this.isContentVisible;
            },
            selectItem(album) {
                this.$emit('input', album);
                this.isContentVisible = false;
            },
            addCancel() {
                this.isAddInputVisible = false;
            },
            showAddMessage(message, type) {
                this.addMessageType = type;
                this.addMessage = message;
                setTimeout(() => this.addMessage = '', 1500);
            },
            addConfirm() {
                const newAlbumName = this.newAlbumName;
                if (newAlbumName.trim() === '') {
                    this.showAddMessage('专辑名称不能为空', 'error');
                    return;
                }
                this.isAdding = true;
                this[CREATE_ALBUM]({newAlbumName})
                    .then(() => {
                        this.showAddMessage('专辑创建成功', 'success');
                        this.newAlbumName = '';
                    })
                    .catch(() => this.showAddMessage('专辑创建失败', 'error'))
                    .finally(() => this.isAdding = false);
            },
            ...mapActions([FETCH_ALBUMS, CREATE_ALBUM])
        },
        computed: {
            ...mapState(['albums']),
            filteredAlbums() {
                const re = new RegExp(this.albumKey.trim(), 'i');
                return this.albums.filter(album => re.test(album.name));
            },
            addMessageClass() {
                const base = 'albums-select__add-message';
                const modifier = this.addMessageType === 'error' ? '--error' : '--success';
                return [base, base + modifier];
            }
        },
        async created() {
            await this[FETCH_ALBUMS]();
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    $select-height: 35px;
    $border-radius: 8px;
    $content-height: 280px;
    $search-height: 35px;

    %border {
        border: 1px solid $text-color-secondary;
        border-radius: $border-radius;
    }

    .albums-select {
        position: relative;
        @extend %border;
        height: $select-height;
        cursor: pointer;
        user-select: none;
        font-size: 0.9em;

        &__value {
            display: inline-block;
            line-height: $select-height - 2px;
            max-width: calc(100% - 50px);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-left: 8px;
        }

        &__content {
            position: absolute;
            @extend %border;
            width: 100%;
            height: $content-height;
            top: $select-height + 8px;
            overflow: hidden;
        }

        &__search {
            border-radius: $border-radius $border-radius 0 0;
            border-bottom: 1px solid $text-color-secondary;
            padding: 0 8px;
            height: $search-height;

            > input {
                border: none;
                outline: none;
                width: 100%;
                line-height: $search-height - 1px;
            }
        }

        &__list-container {
            height: calc(100% - #{$search-height});
            border-radius: 0 0 $border-radius $border-radius;
            overflow: auto;
            @extend %scrollbar
        }

        &__add {
            position: relative;
            border-bottom: 1px solid $text-color-secondary-light;
        }

        &__add-button {
            padding: 8px;
            color: $text-color-primary-light;
        }

        &__add-button:hover {
            background-color: $color-accent-dark;
        }

        &__add-message {
            color: white;
            padding: 8px;
            text-align: center;

            &--error {
                background: $color-error;
            }

            &--success {
                background: $color-success;
            }
        }

        &__add-input {
            border: none;
            outline: none;
            width: 100%;
            padding: 8px;
        }

        &__add-footer {
            padding: 0 8px 6px 8px;
            font-size: 0;

            $space: 8px;

            :first-child {
                margin-right: $space;
            }

            .v-flat-button {
                font-weight: normal;
                font-size: 14px;
                padding: 6px 8px;
                text-align: center;
                width: calc(50% - #{$space} / 2);
            }
        }

        &__list {

            > li {
                padding: 6px 8px;
                color: $text-color-primary-light;
            }

            > li:hover {
                background-color: $color-accent-dark;
            }
        }
    }
</style>
