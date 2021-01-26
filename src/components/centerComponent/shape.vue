<template>
    <div class="shape" @mousedown="handleMouseDown" ref="target" @contextmenu.prevent="rightClick"
        :class="{ active: this.active }">
        <div class="shape-point" :style="getPointStyle(item)" v-for="item in pointList" :key="item" v-show="isshowPoint"
            @mousedown="handleMouseDownOnPoint($event,item)"></div>
        <slot></slot>
    </div>
</template>
<script>
import eventBus from "@/utils/eventBus.js";
import { mapState } from "vuex";
import runAnimation from "@/utils/runAnimation.js";
export default {
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        defaultStyle: {
            require: true,
            type: Object,
            default: {},
        },
        element: {
            require: true,
            type: Object,
            default: {},
        },
        zindex: {
            require: true,
            type: Number,
        },
    },
    data() {
        return {
            pointList: ["t", "r", "b", "l", "lt", "rt", "lb", "rb"],
            directionKey: {
                // 光标显示样式
                t: "n",
                b: "s",
                l: "w",
                r: "e",
            },
            isshowPoint: false,
        };
    },
    computed: {
        ...mapState(["curComponent"]),
    },
    mounted() {
        document.addEventListener("click", this.handleSwift);
        this.defaulyWidth = this.defaultStyle.width; //拖动时不能小于默认宽和高
        this.defaulyHeight = this.defaultStyle.height;
        eventBus.$on("runAnimation", () => {
            if (this.element == this.curComponent) {
                runAnimation(this.$el, this.curComponent.animations);
            }
        });
    },
    beforeDestroy() {
        document.removeEventListener("click", this.handleSwift);
    },
    methods: {
        rightClick(e) {
            e.stopPropagation();
            e.preventDefault();
            let target = e.target;
            let left = e.offsetX;
            let top = e.offsetY;
            while (!target.className.includes("edit")) {
                left += target.offsetLeft;
                top += target.offsetTop;
                target = target.parentNode;
            }
            this.$store.commit("showContexeMenu", { left, top });
        },
        handleSwift(e) {
            if (this.$refs.target.contains(e.target)) {
                this.isshowPoint = true;
            } else {
                this.isshowPoint = false;
            }
        },
        handleMouseDown(e) {
            e.stopPropagation();
            this.isshowPoint = true;
            let pos = { ...this.defaultStyle }; //子改父属性不好
            const target = this.$refs.target;
            this.$store.commit("setCurComponent", {
                component: this.element,
                zIndex: this.zindex,
            });
            let {
                width: targetW,
                height: targetH,
            } = target.getBoundingClientRect();
            const {
                height: editH,
                width: editW,
                left: editL,
                top: editT,
            } = document.getElementById("edit").getBoundingClientRect();
            const startX = e.clientX;
            const startY = e.clientY;
            const startLeft = parseInt(pos.left);
            const startTop = parseInt(pos.top);
            const elewidth = pos.width;
            const eleheight = pos.height;
            const pointPosx = startX - (target.offsetLeft + editL);
            const pointPosY = startY - (target.offsetTop + editT);
            let move = (e) => {
                let currentX = e.clientX;
                let currentY = e.clientY;
                let resL = currentX - startX + startLeft;
                let resT = currentY - startY + startTop;
                if (currentX - pointPosx <= editL) {
                    resL = 0;
                }
                if (currentX > editW - targetW + editL + pointPosx) {
                    resL = editW - targetW;
                }
                if (currentY - pointPosY < editT) {
                    resT = 0;
                }
                if (currentY > editH - targetH + editT + pointPosY) {
                    resT = editH - targetH;
                }

                pos.left = resL;
                pos.top = resT;
                //修改当前组件组件样式
                this.$store.commit("modifyCurComponentStyle", pos);
                //用来监听 辅助线距离
                //currentY-startY>0 true 表示向下, 反之向上
                //currentX-startX>0 true 表示向左,反之向右
                this.$nextTick(() => {
                    eventBus.$emit(
                        "move",
                        currentY - startY > 0,
                        currentX - startX > 0
                    );
                });
            };
            let up = (e) => {
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
                //隐藏线
                eventBus.$emit("unmove");
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        },
        getPointStyle(point) {
            let { width, height } = this.defaultStyle;
            const LeftSide = /l/.test(point);
            const RightSide = /r/.test(point);
            const TopSide = /t/.test(point);
            const ButtonSide = /b/.test(point);
            let newLeft = 0;
            let newTop = 0;
            if (point.length == 2) {
                //四个角
                newLeft = LeftSide ? 0 : width;
                newTop = TopSide ? 0 : height;
            } else {
                if (TopSide || ButtonSide) {
                    //上下两点
                    newLeft = width / 2;
                    newTop = TopSide ? 0 : height;
                }
                if (LeftSide || RightSide) {
                    //左右两点
                    newLeft = LeftSide ? 0 : width;
                    newTop = height / 2;
                }
            }
            let cursor =
                point
                    .split("")
                    .reverse()
                    .map((m) => this.directionKey[m])
                    .join("") + "-resize";
            const style = {
                marginLeft: RightSide ? "-4px" : "-3px",
                marginTop: "-3px",
                left: `${newLeft}px`,
                top: `${newTop}px`,
                cursor,
            };
            return style;
        },
        handleMouseDownOnPoint(e, point) {
            e.stopPropagation();
            e.preventDefault();
            const pos = { ...this.defaultStyle };
            const height = parseInt(pos.height);
            const width = parseInt(pos.width);

            const top = parseInt(pos.top);
            const left = parseInt(pos.left);
            const startX = e.clientX;
            const startY = e.clientY;
            let move = (e) => {
                let curX = e.clientX;
                let curY = e.clientY;
                let disx = curX - startX;
                let disy = curY - startY;
                const hasT = /t/.test(point);
                const hasB = /b/.test(point);
                const hasL = /l/.test(point);
                const hasR = /r/.test(point);
                //"t", "r", "b", "l", "lt", "rt", "lb", "rb"
                const newHeight = height + (hasT ? -disy : hasB ? disy : 0);
                const newWidth = width + (hasL ? -disx : hasR ? disx : 0);

                pos.height =
                    newHeight > this.defaulyHeight
                        ? newHeight
                        : this.defaulyHeight;
                pos.width =
                    newWidth > this.defaulyWidth ? newWidth : this.defaulyWidth;
                pos.left = left + (hasL ? disx : 0);
                pos.top = top + (hasT ? disy : 0);
                this.$store.commit("modifyCurComponentStyle", pos);
            };

            let up = (e) => {
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        },
    },
};
</script>

<style lang="less" scoped>
.shape {
    position: absolute;
    display: inline-block;
    z-index: 99;
    height: 100%;
}
.active {
    outline: 1px solid #70c0ff;
}
.shape-point {
    position: absolute;
    background: #59c7f9;
    width: 5px;
    height: 5px;
    border: 1px solid #59c7f9;
    border-radius: 50%;
    z-index: 100;
}
</style>