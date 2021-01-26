<template>
    <div>
        <div :class="line.includes('x')?'xline':'yline'" :ref='line' v-for="(line) in lines" :key="line"
            v-show="lineStatus[line]"></div>
    </div>
</template>

<script>
import eventBus from "@/utils/eventBus.js";
import { mapState } from "vuex";
export default {
    data() {
        return {
            lines: ["xt", "xb", "yl", "yr"], //分别 x轴 top线 buttom线 y轴 left right线
            diff: 3, // 相聚到3显示出线
            lineStatus: {
                xt: false,
                xb: false,
                yl: false,
                yr: false,
            },
        };
    },
    mounted() {
        eventBus.$on("move", (isDownward, isRightward) => {
            // console.log("是否向下",isDownward);
            // console.log("是否向右",isRightward);
            this.showLine(isDownward, isRightward);
        });
        eventBus.$on("unmove", () => {
            //隐藏线
            this.hideLine();
        });
    },
    computed: mapState(["curComponent", "componentData"]),
    methods: {
        showLine(isDownward, isRightward) {
            const lines = this.$refs;
            const components = this.componentData;
            const dragComponentInfo = { ...this.curComponent.style };
            const dragEleHalfwidth = dragComponentInfo.width / 2;
            const dragEleHalfheight = dragComponentInfo.height / 2;
            const { top, height, left, width } = dragComponentInfo;
            dragComponentInfo.bottom = top + height;
            dragComponentInfo.right = left + width;
            this.hideLine();
            components.forEach((component) => {
                if (component == this.curComponent) {
                    return;
                }
                const { top, left, height, width } = component.style;
                const bottom = top + height;
                const right = left + width;
                const componentHalfWidth = width / 2;
                const componentHalfHeight = height / 2;
                const conditions = {
                    top: [
                        {
                            isNearly: this.isNearly(dragComponentInfo.top, top),
                            lineNode: lines.xt[0], // xt
                            line: "xt",
                            lineShift: top,
                        },
                        {
                            isNearly: this.isNearly(
                                dragComponentInfo.bottom,
                                top
                            ),
                            lineNode: lines.xt[0], // xb
                            line: "xt",
                            lineShift: top,
                        },
                        {
                            isNearly: this.isNearly(
                                dragComponentInfo.top,
                                bottom
                            ),
                            lineNode: lines.xb[0], // xb
                            line: "xb",
                            lineShift: bottom,
                        },
                        {
                            isNearly: this.isNearly(
                                dragComponentInfo.bottom,
                                bottom
                            ),
                            lineNode: lines.xb[0], // xb
                            line: "xb",
                            lineShift: bottom,
                        },
                    ],
                    left: [
                        {
                            isNearly: this.isNearly(
                                dragComponentInfo.left,
                                left
                            ),
                            lineNode: lines.yl[0], // yl
                            line: "yl",
                            lineShift: left,
                        },
                        {
                            isNearly: this.isNearly(
                                dragComponentInfo.right,
                                left
                            ),
                            lineNode: lines.yl[0], // yl
                            line: "yl",
                            lineShift: left,
                        },
                        {
                            isNearly: this.isNearly(
                                dragComponentInfo.left,
                                right
                            ),
                            lineNode: lines.yr[0], // yr
                            line: "yr",
                            lineShift: right,
                        },
                        {
                            isNearly: this.isNearly(
                                dragComponentInfo.right,
                                right
                            ),
                            lineNode: lines.yr[0], // yr
                            line: "yr",
                            lineShift: right,
                        },
                    ],
                };
                const needToShow = [];
                Object.keys(conditions).forEach((key) => {
                    conditions[key].forEach((condition) => {
                        if (!condition.isNearly) return;
                        condition.lineNode.style[
                            key
                        ] = `${condition.lineShift}px`;
                        needToShow.push(condition.line);
                    });
                });
                if (needToShow.length > 0) {
                    this.drawLine(needToShow, isDownward, isRightward);
                }
            });
        },
        hideLine() {
            Object.keys(this.lineStatus).forEach((key) => {
                this.lineStatus[key] = false;
            });
        },
        drawLine(needToShow, isDownward, isRightward) {
            Object.keys(this.lineStatus).forEach((key) => {
                if (needToShow.includes(key)) {
                    this.lineStatus[key] = true;
                } else {
                    this.lineStatus[key] = false;
                }
            });
        },
        isNearly(dragValue, targetValue) {
            return Math.abs(dragValue - targetValue) <= this.diff;
        },
    },
};
</script>

<style lang="less" scoped>
.xline {
    height: 1px;
    width: 100%;
    position: absolute;
    z-index: 1000;
    border: 1px dashed #59c7f9;
    opacity: 0.5;
}
.yline {
    height: 100%;
    width: 1px;
    position: absolute;
    z-index: 1000;
    border: 1px dashed #59c7f9;
    opacity: 0.5;
}
</style>