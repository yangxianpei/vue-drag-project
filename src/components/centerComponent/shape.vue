<template>
    <div class="shape" @mousedown="handleMouseDown" ref="target">
        <div class="shape-point" :style="getPointStyle(item)" v-for="item in pointList" :key="item"
            v-show="isshowPoint"></div>
        <slot></slot>
    </div>
</template>
<script>
import eventBus from "@/utils/eventBus.js";
export default {
    props: {
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
    mounted() {
        document.addEventListener("click", this.handleSwift);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.handleSwift);
    },
    methods: {
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
            let pos = this.defaultStyle;
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
            } = document.getElementById("context").getBoundingClientRect();
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
    },
};
</script>

<style lang="less" scoped>
.shape {
    position: absolute;
    display: inline-block;
}
.shape-point {
    position: absolute;
    background: #59c7f9;
    width: 5px;
    height: 5px;
    border: 1px solid #59c7f9;
    border-radius: 50%;
}
</style>