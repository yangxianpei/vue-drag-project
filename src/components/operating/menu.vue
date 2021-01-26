<template>
    <div v-show="menuShow" class="Menu" :style="{top:menuTop+'px',left:menuLeft+'px'}">
        <ul>
            <li @click="handleDelete">删除</li>
            <li @click="handleUp">置顶</li>
            <li @click="handledown">置底</li>
            <li @click="handleAdd">上移</li>
            <li  @click="handleDecrease">下移</li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    computed: { ...mapState(["menuShow", "menuTop", "menuLeft"]) },
    methods: {
        ...mapMutations(["deleteComponent", "upComponent","downComponent","AddComponentZindex","decreaseComponentZindex"]),
        handleDelete() {
            this.deleteComponent();
        },
        handleUp() {
            this.upComponent(this);
        },
        handledown(){
            this.downComponent(this)
        },
        handleAdd(){
            this.AddComponentZindex(this)
        },
        handleDecrease(){
            this.decreaseComponentZindex(this)
        }
    },
};
</script>

<style lang="less" scoped>
.Menu {
    position: absolute;
    border: 1px solid #409eff;
    cursor: pointer;
    z-index: 9999;
    background: #fff;
    ul {
        li {
            padding: 5px;
            font-size: 14px;
        }
        li:hover {
            background: #dfe6e9;
        }
    }
}
</style>