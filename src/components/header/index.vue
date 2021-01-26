<template>
    <div class="header">
        <el-button ref="back" id='back' >撤消</el-button>
        <el-button @click="save">保存</el-button>
        <el-button @click="preLook">预览</el-button>
        <el-button @click="clear">清空画布</el-button>
        <div class="canvas-size">
            <span>画布大小</span>
            <input type="number" v-model="canvasSize.width">
            <span>*</span>
            <input type="number" v-model="canvasSize.height">
        </div>
        <Operating ref="Operating"></Operating>
    </div>

</template>
<script>
import { mapState } from "vuex";
import Operating from "@/components/operating";
export default {
    components: {
        Operating,
    },
    data() {
        return {
            width: 0,
            height: 0,
        };
    },
    mounted() {
        console.log(this.$refs);
        // document.getElementById('back').addEventListener("contextmenu", (e) => {
        //     e.stopPropagation();
        //     e.preventDefault();
        //     console.log(1);
        // });
    },
    computed: { ...mapState(["canvasSize", "componentData"]) },
    methods: {
        test(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log(1);
        },
        change() {
            this.$store.commit(
                "modefiyCanvasSize",
                parseInt(this.width),
                parseInt(this.height)
            );
        },
        cancel() {},
        preLook() {
            this.$refs.Operating.PreLookShow = true;
        },
        save() {
            localStorage.setItem(
                "componentData",
                JSON.stringify(this.componentData)
            );
            localStorage.setItem("canvasSize", JSON.stringify(this.canvasSize));
            this.$message.info("保存成功");
        },
        clear() {
            this.$store.commit("clearComponentData", []);
        },
    },
};
</script>

<style lang="less">
.header {
    display: flex;
    align-items: center;
    height: 80px;
    line-height: 80px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    .canvas-size {
        input {
            width: 50px;
            outline: none;
        }
        cursor: pointer;
        margin-left: 10px;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        color: #606266;
        font-size: 14px;
    }
}
</style>