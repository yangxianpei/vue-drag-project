<template>
    <div class="home">
        <header>
            <!-- 命令行顶部 -->
            <headerCom></headerCom>
        </header>
        <main>
            <!-- 左侧组件部分 -->
            <section class="left">
                <leftCom></leftCom>
            </section>

            <!-- 中间组件部分 -->
            <section class="center" id='center' ref="center">
                <div class="context" id='context' @click="center">
                    <centerCom></centerCom>
                </div>
            </section>

            <!-- 右侧组件部分 -->
            <section class="right">
                <rightCom></rightCom>
            </section>
        </main>

    </div>
</template>

<script>
import headerCom from "@/components/header";
import leftCom from "@/components/leftComponent";
import rightCom from "@/components/rightComponent";
import centerCom from "@/components/centerComponent";
import { cloneDeep } from "loadsh";
import componentsList from "@/packages/component-list";
import generateID from "@/utils/generateID";
export default {
    name: "Home",
    components: {
        headerCom,
        leftCom,
        rightCom,
        centerCom,
    },
    data() {
        return {
            componentsList,
        };
    },
    mounted() {
        document.addEventListener("dragover", this.handleDragOver);
        document.addEventListener("dragend", this.handleDragend);
        document.addEventListener("drop", this.handleDrop);
    },
    created() {
        let componentData = localStorage.getItem("componentData");
        let canvasSize = localStorage.getItem("canvasSize");
        if (componentData) {
            componentData = this.addID(JSON.parse(componentData));
            this.$store.commit("setCurComponentData", componentData);
        }
        if (canvasSize) {
            this.$store.commit("setCanvasSize", JSON.parse(canvasSize));
        }
    },
    methods: {
        center() {
            this.$store.commit("hideMenu");
        },
        addID(componentData) {
            componentData.forEach((item) => {
                item.id = generateID();
            });
            return componentData;
        },
        handleDragend(e) {
            e.preventDefault();
            e.target.style.opacity = "";
        },
        handleDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            const center = this.$refs.center;
            if (!center.contains(e.target)) return;
            const component = cloneDeep(
                componentsList[e.dataTransfer.getData("index")]
            );
            component.id = generateID();
            component.style.top = e.offsetY;
            component.style.left = e.offsetX;
            this.$store.commit("addComponent", component);
        },
        handleDragOver(e) {
            e.preventDefault();
            if (e.target.id == "context") {
                e.dataTransfer.dropEffect = "copy";
            }
            return;
        },
    },
    destroyed() {
        document.removeEventListener("dragover", this.handleDragOver);
        document.removeEventListener("dragend", this.handleDragend);
        document.removeEventListener("drop", this.handleDrop);
    },
};
</script>

<style lang="less" scoped>
.home {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    main {
        flex: 1;
        display: flex;
        height: calc(100% - 80px);
        justify-content: space-between;
        overflow: hidden;
        .center {
            // display: flex;
            // justify-content: center;
            max-width: 70%;
            background: #dfe6e9;
            padding: 30px;

            .context {
                height: 100%;
                overflow: auto;
                position: relative;
            }
        }
        .left,
        .right {
            height: 100%;
            width: 30%;
            max-width: 260px;
            background: #ffffff;
        }
    }
}
</style>