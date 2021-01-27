<template>
    <component class="component" :is="config.component" :propValue="config.propValue" :style="getStyle(config.style)">
    </component>
</template>

<script>
import { getStyle } from "@/utils";
import runAnimation from "@/utils/runAnimation.js";
export default {
    props: {
        config: {
            type: Object,
        },
    },
    data() {
        return {
            getStyle,
        };
    },
    mounted() {
        runAnimation(this.$el, this.config.animations,0);
    },
};
</script>
<style lang="less" scoped>
.component {
    position: absolute;
}
</style>