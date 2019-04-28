<template>
    <svg class="v-icon"
         :width="width"
         :height="height">
        <use :xlink:href="'#' + name"></use>
    </svg>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            width: {
                type: [Number, String],
                default: 24
            },
            height: {
                type: [Number, String],
                default: 24
            }
        }
    }
</script>
