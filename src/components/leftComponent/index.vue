<template>
     <div  class="component-list" >
            <div v-for="(item, index) in componentsList" :key="index" class="list" draggable :data-index="index">
                <el-button type="primary" :icon="item.icon">{{ item.label }}</el-button>
            </div>
        </div>
</template>
<script>
import componentsList from "@/packages/component-list";
export default {
    data() {
        return {
            componentsList,
        };
    },
    mounted(){
        document.addEventListener('dragstart',this.handleDragStart)
    },
    methods:{
        handleDragStart(e){
             e.dataTransfer.setData('index', e.target.dataset.index)
             event.target.style.opacity = .5;
        },
    },
    destroyed(){
        document.removeEventListener('dragstart',this.handleDragStart)
    }
};
</script>
<style lang="less" scoped>
.component-list {
        display: flex;
        flex-flow: wrap;
        .list {
            margin: 5px;
            text-align: center;
        }
        .el-button--primary:hover,.el-button--primary:focus{
            background: #409EFF!important;
        }
    }
</style>