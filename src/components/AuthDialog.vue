<template>
    <div class="mask" v-if="visible" @click.self="hideAuthDialog">
        <div class="auth-dialog">
            <textarea @keyup.shift.space="logIn" v-model="credential"></textarea>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import {LOG_IN} from "@/store/action-types";

    export default {
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            credential: '',
            lock: false
        }),
        methods: {
            ...mapActions([LOG_IN]),
            hideAuthDialog() {
                this.$emit('update:visible', false);
            },
            logIn() {
                if (this.lock) {
                    return;
                }
                this.lock = true;
                this.credential = this.credential.trim();
                this[LOG_IN](this.credential)
                    .then(() => this.hideAuthDialog())
                    .catch(() => this.$showToast('登录失败'))
                    .finally(() => setTimeout(() => this.lock = false, 2000));
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .auth-dialog {
        @extend %dialog;
        overflow: hidden;
        font-size: 0;

        textarea {
            @extend %scrollbar;
            box-sizing: border-box;
            font-size: 16px;
            padding: 8px 12px;
            width: 100%;
            height: 200px;
            resize: none;
            outline: none;
            border: none;
        }
    }
</style>