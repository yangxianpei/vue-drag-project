<template>
    <div class="header">
        <el-button @click="cancel">撤消</el-button>
        <el-button @click="preLook">预览</el-button>
        <el-button @click="save">保存</el-button>
    </div>
</template>
<script>
export default {
    methods:{
        cancel(){},
        preLook(){},
        save(){}
    }
}
</script>

<style lang="less">
.header{
    display: flex;
    align-items: center;
    height: 80px;
    line-height: 80px;
    background: #fff;
        border-bottom: 1px solid #ddd;
     
}
</style>