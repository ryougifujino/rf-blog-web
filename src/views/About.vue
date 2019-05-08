<template>
    <div class="about">
        <pre>
        　☆ *　. 　☆
        　　. ∧＿∧　∩　* ☆
        * ☆ ( ・∀・)/ .
        　. ⊂　　 ノ* ☆
        ☆ * (つ ノ .☆
        　　 (ノ
        </pre>
        <div class="about__item">很高兴遇见你 ^_^</div>
        <div class="about__item">
            GitHub: <a target="_blank" href="https://github.com/ryougifujino">@ryougifujino</a>
        </div>
        <div class="about__item">
            此博客：
            <a target="_blank" href="https://github.com/ryougifujino/rf-blog-web">rf-blog-web</a>
            <a target="_blank" href="https://github.com/ryougifujino/rf-blog-server">
                rf-blog-server
            </a>
        </div>
        <div class="about__item">
            邮箱: <a href="mailto:ryougfiujino@gmai.com">ryougifujino@gmail.com</a>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .about {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;

        &__item {
            line-height: 3;

            > a {
                color: $text-color-primary-light;

                @include sm("&:active", "&:hover") {
                    cursor: pointer;
                }
            }
        }
    }
</style>
