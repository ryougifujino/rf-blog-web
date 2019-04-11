<template>
    <div class="mask" v-if="visible">
        <div class="post-edit-publisher">
            <div class="post-edit-publisher__header">发布博文</div>
            <div class="post-edit-publisher__form">
                <div class="post-edit-publisher__item">
                    <VRadioGroup class="post-edit-publisher__privacy"
                                 v-bind.sync="privacy"></VRadioGroup>
                </div>
                <div class="post-edit-publisher__item">
                    <div class="post-edit-publisher__item-title">专辑</div>
                    <AlbumsSelect v-model="album"></AlbumsSelect>
                </div>
                <div class="post-edit-publisher__item">
                    <div class="post-edit-publisher__item-title">标签</div>
                    <VInput class="post-edit-publisher__tag-input"
                            placeholder="添加标签"
                            maxlength="200"
                            max-width></VInput>
                </div>
            </div>
            <div class="post-edit-publisher__footer">
                <div class="post-edit-publisher__buttons-container">
                    <VButtonFlat @click.native="cancel">取消</VButtonFlat>
                    <VButtonFlat @click.native="confirm">确认</VButtonFlat>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AlbumsSelect from "@/components/AlbumsSelect.vue";

    export default {
        components: {
            AlbumsSelect
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            privacy: {
                items: [{name: "公开", value: false}, {name: "私有", value: true}],
                checkedIndex: 0 //TODO: change to v-model
            },
            album: null,
            formData: {
                isPrivate: false,
                albumId: null,
                tagIds: []
            }
        }),
        methods: {
            cancel() {
                this.$emit('update:visible', false);
            },
            confirm() {

            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    $header-height: 50px;
    $border-radius: 16px;

    .post-edit-publisher {
        @extend %center;
        width: 450px;
        height: 550px;
        @media screen and (max-width: 450px) {
            width: 90%;
            min-width: 300px;
        }
        border-radius: $border-radius;

        &__header {
            font-size: 16px;
            color: $text-color-primary;
            height: $header-height;
            line-height: $header-height;
            border-radius: $border-radius $border-radius 0 0;
            border-bottom: 1px solid $color-accent-dark;
            text-align: center;
        }

        &__form {
            position: absolute;
            top: $header-height;
            bottom: $header-height;
            left: 16px;
            right: 16px;
        }

        &__item {
            margin: 16px 0;
        }

        &__item:after {
            display: block;
            content: '';
            clear: both;
        }

        &__item-title {
            color: $text-color-primary-light;
            padding: 8px 4px;
        }

        &__privacy {
            float: right;
        }

        &__tag-input {
            font-size: 0.9em;
        }

        &__footer {
            height: $header-height;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 0 0 $border-radius $border-radius;
        }

        &__buttons-container {
            display: inline-block;
            position: absolute;
            right: 16px;

            > div {
                background-color: $color-accent;
                font-weight: normal;
                font-size: 14px;
            }

            > div:hover {
                background-color: $color-accent-dark;
                color: $text-color-secondary;
            }
        }
    }


</style>
