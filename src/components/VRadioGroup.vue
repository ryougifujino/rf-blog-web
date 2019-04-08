<template>
    <div>
        <template v-for="(item, index) of items">
            <span :class="radioClass(index)" @click="checkItem(index)">{{item.name}}</span>
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
            checkedIndex: {
                type: Number,
                require: true
            }
        },
        methods: {
            checkItem(index) {
                this.$emit('update:checkedIndex', index);
            }
        },
        computed: {
            radioClass() {
                return index => [
                    'v-radio-group__radio',
                    {'v-radio-group__radio--checked': index === this.checkedIndex}
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
