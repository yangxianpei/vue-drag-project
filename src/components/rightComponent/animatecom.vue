<template>
    <div class="animate">
        <el-button @click="add">添加动画</el-button>
        <el-button @click="prelook">预览动画</el-button>
        <Modal v-model="addAnimate">
            <el-tabs v-model="tabsValue">
                <el-tab-pane :label="item.label" :name="item.label" v-for="(item,index) in animationData" :key="index">
                    <el-scrollbar>
                        <span v-for="(animate,index) in item.children" class="animate__animated" :key="animate.value"
                            @mouseover="mouseoverhandle(index)"
                            :class="animationIndex == index?'animate__'+animate.value:''"
                            @click="addstyleHandle(animate.value)">
                            {{animate.label}}
                        </span>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </Modal>
    </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import animationData from "@/utils/animationData.js";
import eventBus from "@/utils/eventBus";
export default {
    components: {
        Modal,
    },
    data() {
        this.animationData = animationData;
        return {
            addAnimate: false,
            tabsValue: "进入",
            animationIndex: "",
        };
    },
    methods: {
        addstyleHandle(animation) {
            this.$store.commit("addAnimation", "animate__" + animation);
            this.addAnimate = false;
        },
        animationhandle(style) {
            this.styleArr.push(style);
        },
        add() {
            this.addAnimate = !this.addAnimate;
        },
        mouseoverhandle(value) {
            this.animationIndex = value;
        },
        prelook() {
            eventBus.$emit("runAnimation");
        },
    },
};
</script>
<style lang="less" scoped>
.animate {
    display: flex;
    justify-content: center;
    // .el-tabs {
    //     margin-top: 20px;
    // }
}

.el-scrollbar {
    .el-scrollbar__view {
        display: flex;
        flex-wrap: wrap;
        span {
            display: inline-block;
            width: 100px;
            height: 60px;
            margin: 15px;
            background: #f5f8fb;
            font-size: 12px;
            text-align: center;
            line-height: 60px;
        }
    }
}
</style>