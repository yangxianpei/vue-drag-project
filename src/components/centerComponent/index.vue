<template>
    <div class="edit" id='edit' ref="edit" :style="{width:canvasSize.width+'px',height:canvasSize.height+'px'}">
        <Shape v-for="(item,index) in componentData" :key="item.id" :style="getShapeStyle(item.style,index)"
            :element="item" :zindex="index" :defaultStyle="item.style" :active="item === curComponent">
            <component class="component" v-if="item.component=='v-input'||item.component=='v-text'" :is="item.component" :propValue="item.propValue"
                :style="getComponentStyle(item.style)" @input="handleInput" :element='item' />

            <component class="component" v-else :is="item.component" :propValue="item.propValue"
                :style="getComponentStyle(item.style)" />
        </Shape>
        <MakeLine />
        <Menu />
    </div>
</template>

<script>
//    transform: rotate(2deg);
import Shape from "./shape.vue";
import MakeLine from "./makeLine.vue";
import Menu from "./../operating/menu.vue";
import { getStyle } from "@/utils";
import { mapState } from "vuex";
export default {
    data() {
        this.filter = ["top", "left", "width", "height", "rotate", "zIndex"];
        this.shapefilter = [
            "width",
            "height",
            "top",
            "left",
            "rotate",
            "backgroundColor",
        ];
        return {};
    },
    components: {
        Shape,
        MakeLine,
        Menu,
    },
    computed: { ...mapState(["componentData", "canvasSize", "curComponent"]) },
    methods: {
        handleInput(element, value) {
            console.log(element,value);
            element.propValue = value;
        },
        getShapeStyle(style, index) {
            const result = { ...style };
            this.shapefilter.forEach((item) => {
                if (result[item] && item != "rotate") {
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
    background: #ffff;
    .component {
        width: 100%;
        height: 100%;
    }
}
</style>