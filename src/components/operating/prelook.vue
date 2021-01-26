<template>
    <div class="bg" ref="bg" v-if="show">
        <el-button @click="close">关闭</el-button>
        <div class="canvas" :style="{width:canvasSize.width+'px',height:canvasSize.height+'px'}">
            <template v-for="(item,index) in componentData">
                <component class="component" :key="index" :is="item.component" :propValue="item.propValue"
                    :style="getStyle(item.style)"></component>
            </template>
        </div>
    </div>
</template>
<script>
import { getStyle } from "@/utils";
import { mapState } from "vuex";

export default {
    model: {
        prop: "show",
        event: "changed",
    },
    mounted() {},
    computed: {
        ...mapState(["componentData", "canvasSize"]),
    },
    data() {
        return {
            getStyle,
        };
    },
    props: {
        show: {
            type: Boolean,
        },
    },
    methods: {
        close() {
            this.$emit("changed", false);
        },
    },
};
</script>
<style lang="less" scoped>
.bg {
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    background: #dfe6e9;
    box-shadow: 0px 0px 1px 1px #dfe6e9;
    z-index: 3000;
    overflow: auto;
    padding: 5px;
    .el-button {
        float: right;
    }
    .canvas {
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .component {
            position: absolute;
        }
    }
}
</style>

