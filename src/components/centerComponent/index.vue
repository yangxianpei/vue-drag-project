<template>
    <div class="edit" id='edit'>
        <Shape v-for="(item,index) in $store.state.componentData" :key="item.id"
            :style="getShapeStyle(item.style,index)" :element="item" :zindex="index" :defaultStyle="item.style"
            :id='$store.state.componentsID'>
            <component class="component" :is="item.component" :propValue="item.propValue"
                :style="getComponentStyle(item.style)" />
        </Shape>
        <MakeLine />
    </div>
</template>

<script>
//    transform: rotate(2deg);
import Shape from "./shape.vue";
import MakeLine from "./makeLine.vue";
import { getStyle } from "@/utils";
export default {
    data() {
        this.filter = ["top", "left", "width", "height", "rotate",'zIndex'];
        this.shapefilter=["width",'height','top','left','rotate','backgroundColor']
        return {};
    },
    components: {
        Shape,
        MakeLine,
    },
    methods: {
        getShapeStyle(style, index) {
            const result = { ...style };
            this.shapefilter.forEach((item) => {
                if (result[item] && item != "rotate" ) {
                    result[item] += "px";
                } else {
                    result.transform = "rotate(" + result.rotate + "deg)";
                }
            });
            // 按顺序添加 z-index 层级
            result.zIndex = index;
            return result;
        },
        getComponentStyle(style) {
            let res = getStyle(style, this.filter);
            return res;
        },
    },
};
</script>

<style lang="less" scoped>
.edit {
    height: 800px;
    width: 1024px;
    position: relative;
    .component{
        width: 100%;
        height: 100%;
    }
}
</style>