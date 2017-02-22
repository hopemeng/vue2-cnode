<style lang="less" scoped>
    @import "../less/config";
    .content {
        overflow: auto;
        position: absolute;
        top: 57px;
        right: 0;
        bottom: 50px;
        left: 0;
        z-index: 100; /*堆叠顺序*/
        -webkit-overflow-scrolling: touch; /*快速滚动回弹*/
    }
</style>
<template>
    <div class="content">
        <slot></slot>
    </div>
</template>
<script>

</script>