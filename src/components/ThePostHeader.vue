<template>
    <div class="the-post-header">
        <div class="the-post-header__content">
            <h2 class="the-post-header__title" @click="$router.back()">ryougifujino</h2>
            <img src="~images/baseline-delete-24px.svg" @click="showDeleteConfirm" alt="删除">
            <img src="~images/baseline-edit-24px.svg" @click="editPost" alt="编辑">
        </div>
        <VDialogSimple :visible.sync="isShowDeleteConfirm" @confirm="deleteThePost">
            <template v-slot:header>删除确认</template>
            <template v-slot:body>确定要删除本博文吗？</template>
        </VDialogSimple>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import {DELETE_POST} from "@/store/action-types";

    export default {
        data() {
            return {
                isShowDeleteConfirm: false,
                postId: this.$route.params.id
            };
        },
        methods: {
            ...mapActions([DELETE_POST]),
            showDeleteConfirm() {
                this.isShowDeleteConfirm = true;
            },
            deleteThePost() {
                this[DELETE_POST](this.postId);
                this.$router.back();
            },
            editPost() {
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/dimens";
    @import "~@/assets/styles/mixins";

    .the-post-header {
        height: $view-header-height;
        border-bottom: 1px solid $color-accent-dark;

        &__content {
            max-width: 850px;
            margin: 0 auto;
            padding: 0 16px;
            display: flex;
            align-items: center;

            > img {
                @extend %icon;
            }
        }

        &__title {
            line-height: $view-header-height;
            user-select: none;
            flex: 1;

            &:hover {
                cursor: pointer;
            }
        }
    }
</style>
