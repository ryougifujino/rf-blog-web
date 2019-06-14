<template>
    <transition name="fade" mode="out-in">
        <slot></slot>
    </transition>
</template>

<script>
    export default {}
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: all .25s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
