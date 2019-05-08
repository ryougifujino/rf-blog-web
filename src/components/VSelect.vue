<template>
    <div class="v-select" @click.self="toggleContent">
        <div class="v-select__value-container" @click="toggleContent">
            <span class="v-select__value">{{selectedItemName}}</span>
            <VIcon name="baseline-keyboard_arrow_down-24px" class="v-select__icon"></VIcon>
        </div>
        <div class="v-select__content" v-show="isContentVisible">
            <div class="v-select__search">
                <VIcon name="baseline-search-24px" class="v-select__icon"></VIcon>
                <input :placeholder="`查找${keyword}`" spellcheck="false" v-model="searchKey">
            </div>
            <div class="v-select__list-container">
                <div class="v-select__add">
                    <VProgressBar v-if="isAdding"></VProgressBar>
                    <div class="v-select__add-button"
                         v-if="!isAddInputVisible"
                         @click="isAddInputVisible = true">
                        <VIcon name="baseline-add-24px" class="v-select__icon"></VIcon>
                        新增{{keyword}}
                    </div>
                    <div v-if="isAddInputVisible">
                        <div :class="addMessageClass" v-if="addMessage">{{addMessage}}</div>
                        <input class="v-select__add-input"
                               :placeholder="`添加新${keyword}`"
                               spellcheck="false"
                               :maxlength="maxlength"
                               v-model="newItemName">
                        <div class="v-select__add-footer">
                            <VButtonFlat @click.native="addCancel">取消</VButtonFlat>
                            <VButtonFlat @click.native="addConfirm">确认</VButtonFlat>
                        </div>
                    </div>
                </div>
                <ul class="v-select__list">
                    <li @click="selectItem(null)">未选择</li>
                    <li v-for="item of filteredItems" :key="item.id" @click="selectItem(item.id)">
                        {{item.name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    const UNSELECTED = "未选择";
    export default {
        props: {
            value: {
                required: true,
                validator: prop => typeof prop === 'number' || prop === null
            },
            keyword: {
                required: true,
                type: String
            },
            maxlength: {
                required: true,
                type: Number
            },
            items: {
                required: true,
                type: Array,
                default: () => []
            }
        },
        data: () => ({
            isContentVisible: false,
            isAddInputVisible: false,
            searchKey: '',
            newItemName: '',
            addMessage: '',
            addMessageType: 'error',
            isAdding: false
        }),
        methods: {
            toggleContent() {
                this.isContentVisible = !this.isContentVisible;
            },
            selectItem(itemId) {
                this.$emit('input', itemId);
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
                const newItemName = this.newItemName;
                if (newItemName.trim() === '') {
                    this.showAddMessage(`${this.keyword}名称不能为空`, 'error');
                    return;
                }
                this.isAdding = true;
                this.$emit('add-new', newItemName, p => {
                    p
                        .then(() => {
                            this.showAddMessage(`${this.keyword}创建成功`, 'success');
                            this.newItemName = '';
                        })
                        .catch(() => this.showAddMessage(`${this.keyword}创建失败`, 'error'))
                        .finally(() => this.isAdding = false);
                });
            }
        },
        computed: {
            filteredItems() {
                const re = new RegExp(this.searchKey.trim(), 'i');
                return this.items.filter(({name}) => re.test(name));
            },
            addMessageClass() {
                const base = 'v-select__add-message';
                const modifier = this.addMessageType === 'error' ? '--error' : '--success';
                return [base, base + modifier];
            },
            selectedItemName() {
                if (this.value) {
                    const selectedItem = this.items.find(({id}) => id === this.value);
                    return selectedItem ? selectedItem.name : UNSELECTED;
                } else {
                    return UNSELECTED;
                }
            }
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

    .v-select {
        position: relative;
        @extend %border;
        height: $select-height;
        cursor: pointer;
        user-select: none;
        font-size: 0.9em;
        box-sizing: border-box;
        z-index: 100;

        * {
            box-sizing: border-box;
        }

        &__value-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            border-radius: $border-radius;

            .v-select__icon {
                margin-right: 8px;
                background-color: inherit;
            }

            @include sm("&:active", "&:hover") {
                background-color: $color-background-dark;
            }
        }

        &__value {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin: 0 8px;
            background-color: inherit;
            flex: 1;
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
            display: flex;
            align-items: center;

            > input {
                border: none;
                outline: none;
                flex: 1;
                margin-left: 8px;
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
            display: flex;
            align-items: center;

            > svg {
                margin-right: 8px;
                background-color: inherit;
            }
        }

        @include sm("&__add-button:active", "&__add-button:hover") {
            background-color: $color-background-dark;
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

            .v-flat-button {
                font-weight: normal;
                font-size: 14px;
                padding: 6px 8px;
                text-align: center;
                width: calc(50% - #{$space} / 2);

                &:first-child {
                    margin-right: $space;
                }
            }
        }

        &__list {
            @extend %word-break;

            > li {
                padding: 6px 8px;
                color: $text-color-primary-light;
            }

            @include sm("> li:active", "> li:hover") {
                background-color: $color-background-dark;
            }
        }

        &__icon {
            fill: $text-color-secondary;
            width: 20px;
            height: 20px;
        }
    }
</style>
