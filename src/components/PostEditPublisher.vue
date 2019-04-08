<template>
    <div class="mask" v-if="visible">
        <div class="post-edit__publisher">
            <div class="post-edit__publisher-header">发布博文</div>
            <div class="post-edit__publisher-form">
                <div></div>
            </div>
            <div class="post-edit__publisher-footer">
                <div class="post-edit__publisher-buttons-container">
                    <VFlatButton @click.native="cancel">取消</VFlatButton>
                    <VFlatButton @click.native="confirm">确认</VFlatButton>
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

    .post-edit__publisher {
        @extend %center;
        width: 450px;
        height: 550px;
        @media screen and (max-width: 450px) {
            width: 90%;
            min-width: 300px;
        }
        border-radius: $border-radius;

        &-header {
            font-size: 16px;
            color: $text-color-primary;
            height: $header-height;
            line-height: $header-height;
            border-radius: $border-radius $border-radius 0 0;
            border-bottom: 1px solid $color-accent-dark;
            text-align: center;
        }

        &-form {
            position: absolute;
            top: $header-height;
            bottom: $header-height;
            left: 16px;
            right: 16px;
        }

        &-footer {
            height: $header-height;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 0 0 $border-radius $border-radius;
        }

        &-buttons-container {
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