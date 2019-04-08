<template>
    <div class="mask" v-if="visible">
        <div class="post-edit-publisher">
            <div class="post-edit-publisher__header">发布博文</div>
            <div class="post-edit-publisher__form">
                <div class="post-edit-publisher__item">
                    <VRadioGroup class="post-edit-publisher__privacy"
                                 v-bind.sync="privacy"></VRadioGroup>
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
    export default {
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            privacy: {
                items: [{name: "公开", value: false}, {name: "私有", value: true}],
                checkedIndex: 0
            },
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
                console.log('c')
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/base";

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

        &__privacy {
            float: right;
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
