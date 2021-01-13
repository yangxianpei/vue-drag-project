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
            <section class="center" id='center'>
                <centerCom></centerCom>

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
export default {
    name: "Home",
    components: {
        headerCom,
        leftCom,
        rightCom,
        centerCom,
    },
    mounted() {
        document.addEventListener("dragover", this.handleDragOver);
        document.addEventListener("dragend", this.handleDragend);
        document.addEventListener("drop", this.handleDrop);
    },
    methods: {
        handleDragend(e) {
            e.preventDefault();
            e.target.style.opacity = "";
        },
        handleDrop(e) {
            e.preventDefault();
            const component = cloneDeep(
                componentsList[e.dataTransfer.getData("index")]
            );
            component.id = this.$store.state.componentsID;
            component.style.top = e.offsetY;
            component.style.left = e.offsetX;
            this.$store.commit("increment");
              this.$store.commit("addComponent",component);

        },
        handleDragOver(e) {
            e.preventDefault();
            if (e.target.id == "center") {
                e.dataTransfer.dropEffect = "copy";
            }
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
        .center {
            flex: 1;
            background: #fff;
            margin: 10px;
        }
        .left,
        .right {
            height: 100%;
            width: 200px;
            background: #fff;
        }
    }
}
</style>