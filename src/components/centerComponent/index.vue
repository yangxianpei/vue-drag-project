<template>
    <div class="edit">
        <Shape v-for="(item,index) in $store.state.componentData" :key="item.id"
            :style="getShapeStyle(item.style,index)"
            :defaultStyle="item.style">
            <component class="component" :is="item.component" :propValue="item.propValue"
                :style="getComponentStyle(item.style)" />
        </Shape>
    </div>
</template>

<script>
//    transform: rotate(2deg);
import Shape from "./shape.vue";
import { getStyle } from "@/utils";
export default {
    data() {
        this.filter = ["top", "left", "width", "height", "zIndex", "rotate"];
        return {};
    },
    components: {
        Shape,
    },
    methods: {
        getShapeStyle(style,index) {
            const result = { ...style };
            this.filter.forEach(item => {
                 if(result[item]&&item!='rotate'){
                      result[item]+='px'
                 }else{
                       result.transform = "rotate(" + result.rotate + "deg)";
                 }
                 
            });
            // 按顺序添加 z-index 层级
            result.zIndex = index;
            return result;
        },
        getComponentStyle(style) {
            let res = getStyle(style,this.filter);
            return res;
        },
    },
};
</script>

<style lang="less" scoped>
.edit{
}
</style>