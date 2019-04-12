<template>
    <div>
        <template v-for="(item, index) of items">
            <span :class="radioClass(item)" @click="checkItem(item)">{{item.name}}</span>
            <span class="v-radio-group__divider" v-if="index !== (items.length - 1)">/</span>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            items: {
                type: Array,
                require: true
            },
            value: {
                type: [String, Number, Boolean],
                require: false
            }
        },
        methods: {
            checkItem(item) {
                this.$emit('input', item.value);
            }
        },
        computed: {
            radioClass() {
                return item => [
                    'v-radio-group__radio',
                    {'v-radio-group__radio--checked': item.value === this.value}
                ];
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .v-radio-group {

        &__radio {
            display: inline-block;
            padding: 4px 8px;
            color: $text-color-secondary;
            cursor: pointer;
        }

        &__radio--checked {
            color: $text-color-primary;
        }

        &__divider {
            user-select: none;
        }
    }
</style>
